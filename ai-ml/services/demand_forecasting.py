
"""FreshBites baseline food-demand forecasting."""

import pandas as pd

from services.data_loader import get_database, close_mongo_connection
from utils.config import PREDICTIONS_DIR


FORECAST_FILE = PREDICTIONS_DIR / "demand_forecast.csv"
HISTORY_FILE = PREDICTIONS_DIR / "daily_food_demand.csv"

FORECAST_DAYS = 7
LOOKBACK_DAYS = 28


def load_daily_demand(database):
    """Aggregate eligible order-item quantities by date and food."""

    rows = []

    cursor = database["orders"].find(
        {},
        {
            "createdAt": 1,
            "status": 1,
            "paymentStatus": 1,
            "items": 1,
        },
    )

    for order in cursor:
        status = str(order.get("status", "")).strip().lower()
        payment = str(order.get("paymentStatus", "")).strip().lower()

        if status in {"cancelled", "canceled"}:
            continue

        if payment in {"failed", "cancelled", "canceled", "refunded"}:
            continue

        created_at = pd.to_datetime(
            order.get("createdAt"), errors="coerce", utc=True
        )

        if pd.isna(created_at):
            continue

        order_date = created_at.date().isoformat()

        for item in order.get("items") or []:
            food_id = item.get("foodId")

            if food_id is None:
                continue

            try:
                quantity = float(item.get("quantity", 0))
            except (TypeError, ValueError):
                continue

            if quantity < 0:
                continue

            rows.append(
                {
                    "date": order_date,
                    "food_id": str(food_id),
                    "quantity": quantity,
                }
            )

    columns = ["date", "food_id", "quantity"]

    if not rows:
        return pd.DataFrame(columns=columns)

    raw = pd.DataFrame(rows, columns=columns)

    return (
        raw.groupby(["date", "food_id"], as_index=False)["quantity"]
        .sum()
        .sort_values(["date", "food_id"])
    )


def create_forecast(daily_demand):
    """Forecast each food using its recent average daily demand."""

    output_columns = [
        "forecast_date",
        "food_id",
        "average_daily_quantity",
        "forecast_quantity",
        "method",
    ]

    if daily_demand.empty:
        return pd.DataFrame(columns=output_columns)

    daily_demand = daily_demand.copy()
    daily_demand["date"] = pd.to_datetime(
        daily_demand["date"], errors="coerce", utc=True
    )
    daily_demand = daily_demand.dropna(subset=["date"])

    if daily_demand.empty:
        return pd.DataFrame(columns=output_columns)

    latest_date = daily_demand["date"].max().normalize()
    first_date = latest_date - pd.Timedelta(days=LOOKBACK_DAYS - 1)

    recent = daily_demand[
        (daily_demand["date"] >= first_date)
        & (daily_demand["date"] <= latest_date)
    ]

    if recent.empty:
        return pd.DataFrame(columns=output_columns)

    # Include zero-demand days in the average.
    food_ids = sorted(recent["food_id"].unique())
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

    complete_history = (
        recent.groupby(["date", "food_id"])["quantity"]
        .sum()
        .reindex(complete_index, fill_value=0)
        .reset_index()
    )

    averages = (
        complete_history.groupby("food_id", as_index=False)["quantity"]
        .mean()
        .rename(columns={"quantity": "average_daily_quantity"})
    )

    forecast_dates = pd.date_range(
        start=latest_date + pd.Timedelta(days=1),
        periods=FORECAST_DAYS,
        freq="D",
    )

    records = []

    for _, row in averages.iterrows():
        average = float(row["average_daily_quantity"])

        for forecast_date in forecast_dates:
            records.append(
                {
                    "forecast_date": forecast_date.date().isoformat(),
                    "food_id": row["food_id"],
                    "average_daily_quantity": round(average, 3),
                    "forecast_quantity": round(average, 3),
                    "method": "28-day average baseline",
                }
            )

    return pd.DataFrame(records, columns=output_columns)


def run_forecasting():
    """Generate historical demand and seven-day forecast reports."""

    try:
        database = get_database()
        daily_demand = load_daily_demand(database)

        PREDICTIONS_DIR.mkdir(parents=True, exist_ok=True)

        daily_demand.to_csv(HISTORY_FILE, index=False)
        forecast = create_forecast(daily_demand)
        forecast.to_csv(FORECAST_FILE, index=False)

        print("FreshBites demand forecasting completed.")
        print(f"Historical food-demand rows: {len(daily_demand)}")
        print(f"Forecast rows: {len(forecast)}")

        if not daily_demand.empty:
            print(
                "Most recent order date in dataset:",
                daily_demand["date"].max(),
            )

        if not forecast.empty:
            print("\nForecast summary by food:")
            summary = (
                forecast.groupby("food_id")["forecast_quantity"]
                .sum()
                .sort_values(ascending=False)
            )

            for food_id, quantity in summary.items():
                print(
                    f"  Food ID {food_id}: "
                    f"{quantity:.2f} estimated units over seven days"
                )
        else:
            print(
                "No forecast could be produced. Check whether eligible "
                "orders contain valid dates and food quantities."
            )

        print(f"\nHistorical report: {HISTORY_FILE}")
        print(f"Forecast report: {FORECAST_FILE}")
        print(
            "\nNote: This is a simple average baseline, not a "
            "validated predictive model."
        )

    finally:
        close_mongo_connection()


if __name__ == "__main__":
    run_forecasting()
