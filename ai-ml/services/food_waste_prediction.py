"""Data-driven food waste-risk estimates from order history.

No observed waste or prepared-quantity fields exist in FreshBites MongoDB.
This module estimates surplus *risk* from sales volatility and demand trends.
It does not claim to measure actual wasted food.
"""

from __future__ import annotations

from datetime import datetime, timezone

import numpy as np
import pandas as pd

from services.data_loader import close_mongo_connection, get_database
from services.demand_forecasting import LOOKBACK_DAYS, load_daily_demand
from utils.config import PREDICTIONS_DIR

WASTE_REPORT_FILE = PREDICTIONS_DIR / "food_waste_risk.csv"

METHOD_LABEL = (
    "Demand-volatility waste-risk heuristic "
    "(no observed waste labels in database)"
)

MIN_DAYS_FOR_SURPLUS = 7
MIN_MEAN_DAILY_FOR_SURPLUS = 0.05


def load_food_catalog(database) -> pd.DataFrame:
    """Load available menu items (no customer data)."""
    rows = []

    for food in database["foods"].find(
        {},
        {"name": 1, "category": 1, "isAvailable": 1},
    ):
        rows.append(
            {
                "food_id": str(food["_id"]),
                "food_name": str(food.get("name") or "Unknown food"),
                "category": str(food.get("category") or "Other"),
                "is_available": bool(food.get("isAvailable", True)),
            }
        )

    columns = ["food_id", "food_name", "category", "is_available"]

    if not rows:
        return pd.DataFrame(columns=columns)

    return pd.DataFrame(rows, columns=columns)


def _risk_band(score: float) -> str:
    if score >= 70:
        return "High"
    if score >= 40:
        return "Medium"
    return "Low"


def _suggestions_for(risk: str, reasons: list[str]) -> list[str]:
    suggestions = []

    if risk == "High":
        suggestions.append(
            "Reduce prep batches and monitor this item daily until demand stabilizes."
        )
        suggestions.append(
            "Run a short promotion or bundle to move near-term surplus risk."
        )
    elif risk == "Medium":
        suggestions.append(
            "Use smaller prep quantities and review sales twice weekly."
        )
    else:
        suggestions.append(
            "Maintain current prep levels; recheck if weekend or holiday demand shifts."
        )

    joined = " ".join(reasons).lower()

    if "volatile" in joined or "variability" in joined:
        suggestions.append(
            "Align prep with weekday patterns instead of a single daily average."
        )

    if "declining" in joined or "drop" in joined:
        suggestions.append(
            "Temporarily lower forecast and highlight the item in upsell flows."
        )

    if "no recorded sales" in joined:
        suggestions.append(
            "Confirm the item is still on the menu; pause prep until orders return."
        )

    # Deduplicate while preserving order.
    seen = set()
    unique = []
    for item in suggestions:
        if item not in seen:
            seen.add(item)
            unique.append(item)

    return unique[:4]


def build_waste_risk_report(
    daily_demand: pd.DataFrame,
    catalog: pd.DataFrame,
) -> tuple[pd.DataFrame, dict]:
    """Compute per-food waste-risk rows and response metadata."""

    now = datetime.now(timezone.utc)

    if catalog.empty:
        empty = pd.DataFrame(
            columns=[
                "food_name",
                "category",
                "waste_risk",
                "estimated_surplus_units",
                "risk_score",
                "average_daily_sold",
                "recent_7_day_avg",
                "reasons",
                "suggestions",
            ]
        )
        return empty, {
            "data_period_start": None,
            "data_period_end": None,
            "items_analyzed": 0,
        }

    if daily_demand.empty:
        records = []
        for _, food in catalog.iterrows():
            reasons = [
                "No eligible order history in the analysis window.",
                "Estimated risk only; observed waste is not recorded in FreshBites.",
            ]
            risk = "Medium" if food["is_available"] else "High"
            records.append(
                {
                    "food_name": food["food_name"],
                    "category": food["category"],
                    "waste_risk": risk,
                    "estimated_surplus_units": None,
                    "risk_score": 55 if risk == "Medium" else 75,
                    "average_daily_sold": 0.0,
                    "recent_7_day_avg": 0.0,
                    "reasons": "; ".join(reasons),
                    "suggestions": "; ".join(_suggestions_for(risk, reasons)),
                }
            )

        df = pd.DataFrame(records)
        return df, {
            "data_period_start": None,
            "data_period_end": None,
            "items_analyzed": len(df),
        }

    history = daily_demand.copy()
    history["date"] = pd.to_datetime(history["date"], errors="coerce", utc=True)
    history = history.dropna(subset=["date"])

    latest_date = history["date"].max().normalize()
    first_date = latest_date - pd.Timedelta(days=LOOKBACK_DAYS - 1)

    window = history[
        (history["date"] >= first_date) & (history["date"] <= latest_date)
    ]

    food_ids = sorted(catalog["food_id"].unique())
    calendar = pd.date_range(
        start=first_date,
        end=latest_date,
        freq="D",
        tz="UTC",
    )

    complete_index = pd.MultiIndex.from_product(
        [calendar, food_ids],
        names=["date", "food_id"],
    )

    complete = (
        window.groupby(["date", "food_id"])["quantity"]
        .sum()
        .reindex(complete_index, fill_value=0)
        .reset_index()
    )

    records = []

    for _, food in catalog.iterrows():
        food_id = food["food_id"]
        series = complete.loc[complete["food_id"] == food_id, "quantity"]
        values = series.to_numpy(dtype=float)

        total_sold = float(values.sum())
        days_with_sales = int(np.sum(values > 0))
        mean_daily = float(values.mean()) if len(values) else 0.0
        std_daily = float(values.std(ddof=0)) if len(values) else 0.0

        recent = values[-7:] if len(values) >= 7 else values
        prior = values[-14:-7] if len(values) >= 14 else np.array([])

        recent_avg = float(recent.mean()) if len(recent) else 0.0
        prior_avg = float(prior.mean()) if len(prior) else mean_daily

        cv = (std_daily / mean_daily) if mean_daily > MIN_MEAN_DAILY_FOR_SURPLUS else 0.0

        score = 0.0
        reasons: list[str] = []

        if total_sold <= 0:
            score = 78
            reasons.append("No recorded sales in the analysis period.")
        else:
            if cv >= 1.0:
                score += 35
                reasons.append("Highly variable daily demand (volatility).")
            elif cv >= 0.55:
                score += 22
                reasons.append("Moderate demand variability.")

            if prior_avg > MIN_MEAN_DAILY_FOR_SURPLUS and recent_avg < prior_avg * 0.75:
                drop_pct = round((1 - recent_avg / prior_avg) * 100, 1)
                score += 28
                reasons.append(
                    f"Recent 7-day sales dropped about {drop_pct}% vs the prior week."
                )

            if days_with_sales < 5:
                score += 18
                reasons.append(
                    "Sparse order history; surplus risk is harder to predict reliably."
                )

            if mean_daily < 0.25 and total_sold > 0:
                score += 12
                reasons.append("Very low average daily sales (slow-moving item).")

        if not food["is_available"]:
            score += 10
            reasons.append("Item marked unavailable but still listed in catalog.")

        if not reasons:
            reasons.append("Stable recent demand relative to the 28-day window.")

        reasons.append(
            "Estimate reflects surplus risk from sales patterns, not confirmed waste."
        )

        score = float(max(0, min(100, score)))
        risk = _risk_band(score)

        estimated_surplus = None
        if (
            len(values) >= MIN_DAYS_FOR_SURPLUS
            and mean_daily > MIN_MEAN_DAILY_FOR_SURPLUS
        ):
            surplus = max(0.0, mean_daily - recent_avg)
            estimated_surplus = round(float(surplus), 2)

        records.append(
            {
                "food_name": food["food_name"],
                "category": food["category"],
                "waste_risk": risk,
                "estimated_surplus_units": estimated_surplus,
                "risk_score": round(score, 1),
                "average_daily_sold": round(mean_daily, 3),
                "recent_7_day_avg": round(recent_avg, 3),
                "reasons": "; ".join(reasons),
                "suggestions": "; ".join(_suggestions_for(risk, reasons)),
            }
        )

    df = pd.DataFrame(records).sort_values(
        ["risk_score", "food_name"],
        ascending=[False, True],
    )

    meta = {
        "data_period_start": first_date.date().isoformat(),
        "data_period_end": latest_date.date().isoformat(),
        "items_analyzed": int(len(df)),
    }

    return df, meta


def compute_food_waste_prediction() -> dict:
    """Load MongoDB data and return API-ready waste-risk payload."""
    database = get_database()
    catalog = load_food_catalog(database)
    daily_demand = load_daily_demand(database)

    report, meta = build_waste_risk_report(daily_demand, catalog)

    summary = {"low": 0, "medium": 0, "high": 0}

    if not report.empty:
        counts = report["waste_risk"].value_counts()
        summary["low"] = int(counts.get("Low", 0))
        summary["medium"] = int(counts.get("Medium", 0))
        summary["high"] = int(counts.get("High", 0))

    items = []
    for _, row in report.iterrows():
        surplus = row["estimated_surplus_units"]
        items.append(
            {
                "foodName": str(row["food_name"]),
                "category": str(row["category"]),
                "wasteRisk": str(row["waste_risk"]),
                "estimatedSurplusUnits": (
                    float(surplus) if pd.notna(surplus) else None
                ),
                "riskScore": float(row["risk_score"]),
                "averageDailySold": float(row["average_daily_sold"]),
                "recentSevenDayAverage": float(row["recent_7_day_avg"]),
                "reasons": [
                    part.strip()
                    for part in str(row["reasons"]).split(";")
                    if part.strip()
                ],
                "suggestions": [
                    part.strip()
                    for part in str(row["suggestions"]).split(";")
                    if part.strip()
                ],
            }
        )

    return {
        "success": True,
        "method": METHOD_LABEL,
        "validatedModel": False,
        "observedWasteAvailable": False,
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "dataPeriodStart": meta["data_period_start"],
        "dataPeriodEnd": meta["data_period_end"],
        "itemsAnalyzed": meta["items_analyzed"],
        "summary": summary,
        "items": items,
        "note": (
            "Waste risk is estimated from order quantities and demand patterns. "
            "FreshBites does not store prepared quantities or observed wastage; "
            "surplus figures are indicative only and are not confirmed waste."
        ),
    }


def run_food_waste_prediction():
    """Generate a CSV report for offline inspection."""
    try:
        payload = compute_food_waste_prediction()
        report_rows = payload.get("items") or []

        if report_rows:
            df = pd.DataFrame(
                [
                    {
                        "food_name": row["foodName"],
                        "category": row["category"],
                        "waste_risk": row["wasteRisk"],
                        "estimated_surplus_units": row["estimatedSurplusUnits"],
                        "risk_score": row["riskScore"],
                        "average_daily_sold": row["averageDailySold"],
                        "recent_7_day_avg": row["recentSevenDayAverage"],
                        "reasons": "; ".join(row.get("reasons") or []),
                        "suggestions": "; ".join(row.get("suggestions") or []),
                    }
                    for row in report_rows
                ]
            )
            PREDICTIONS_DIR.mkdir(parents=True, exist_ok=True)
            df.to_csv(WASTE_REPORT_FILE, index=False)
            print(f"Food waste-risk report saved: {WASTE_REPORT_FILE}")
        else:
            print("No menu items available for waste-risk analysis.")

        print(f"Items analyzed: {payload.get('itemsAnalyzed', 0)}")
        print(f"Method: {payload.get('method')}")
    finally:
        close_mongo_connection()


if __name__ == "__main__":
    run_food_waste_prediction()
