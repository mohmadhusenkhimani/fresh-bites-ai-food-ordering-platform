
"""FreshBites AI/ML analytics API."""

import os
from datetime import datetime, timezone
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

from services.data_loader import (
    get_collection_counts,
    close_mongo_connection,
)
from services.food_waste_prediction import compute_food_waste_prediction

# --------------------------------------------------
# Configuration
# --------------------------------------------------

AI_ML_DIR = Path(__file__).resolve().parent
PROJECT_DIR = AI_ML_DIR.parent
PREDICTIONS_DIR = AI_ML_DIR / "predictions"

# Load environment variables from the project locations.
for env_path in [
    PROJECT_DIR / "backend" / ".env",
    PROJECT_DIR / ".env",
    AI_ML_DIR / ".env",
]:
    if env_path.is_file():
        load_dotenv(env_path, override=False)

MONGO_URI = (
    os.getenv("MONGO_URI")
    or os.getenv("MONGODB_URI")
    or os.getenv("MONGODB_URL")
)

DATABASE_NAME = os.getenv("MONGO_DB_NAME", "freshbites")

_mongo_client = None

app = FastAPI(
    title="FreshBites AI/ML API",
    description="Analytics API for the FreshBites admin dashboard",
    version="1.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://fresh-bites-admin.vercel.app",
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)


# --------------------------------------------------
# Shared helpers
# --------------------------------------------------

def get_database():
    """Return the configured MongoDB database."""
    global _mongo_client

    if not MONGO_URI:
        raise HTTPException(
            status_code=503,
            detail=(
                "MongoDB configuration is missing. "
                "Check MONGO_URI in your environment."
            ),
        )

    if _mongo_client is None:
        _mongo_client = MongoClient(
            MONGO_URI,
            serverSelectionTimeoutMS=5000,
        )

    try:
        _mongo_client.admin.command("ping")
        return _mongo_client[DATABASE_NAME]
    except Exception:
        raise HTTPException(
            status_code=503,
            detail="MongoDB is currently unavailable.",
        )


def read_report(filename: str) -> pd.DataFrame:
    """Read a saved analytics report."""
    path = PREDICTIONS_DIR / filename

    if not path.is_file():
        raise HTTPException(
            status_code=503,
            detail=(
                f"Report '{filename}' is not available. "
                "Run its analytics service first."
            ),
        )

    try:
        return pd.read_csv(path)
    except (OSError, pd.errors.ParserError, UnicodeDecodeError):
        raise HTTPException(
            status_code=500,
            detail=f"Could not read analytics report '{filename}'.",
        )


def records_from(df: pd.DataFrame) -> list[dict]:
    """Convert DataFrame values to JSON-safe records."""
    cleaned = df.astype(object).where(pd.notna(df), None)
    return cleaned.to_dict(orient="records")


def get_food_name_map() -> dict:
    """
    Map internal food IDs to display names.
    Internal database IDs are never returned to the frontend.
    """
    db = get_database()

    foods = db["foods"].find(
        {},
        {"name": 1},
    )

    return {
        str(food["_id"]): str(food.get("name") or "Unknown food")
        for food in foods
    }


def display_food_name(food_id, food_names: dict) -> str:
    """Resolve a report's food ID to a display name."""
    if food_id is None or pd.isna(food_id):
        return "Unknown food"

    return food_names.get(str(food_id), "Unknown food")


# --------------------------------------------------
# Basic endpoints
# --------------------------------------------------

@app.get("/")
def root():
    return {
        "service": "FreshBites AI/ML API",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


# --------------------------------------------------
# Overview
# --------------------------------------------------

@app.get("/api/analytics/overview")
def analytics_overview():
    try:
        counts = get_collection_counts()

        return {
            "success": True,
            "database": "connected",
            "generatedAt": datetime.now(timezone.utc).isoformat(),
            "collections": counts,
            "summary": {
                "foods": counts.get("foods", 0),
                "orders": counts.get("orders", 0),
                "users": counts.get("users", 0),
                "reviews": counts.get("reviews", 0),
            },
        }
    except Exception:
        return {
            "success": False,
            "database": "unavailable",
            "message": (
                "Could not retrieve analytics. "
                "Check the MongoDB configuration."
            ),
        }


# --------------------------------------------------
# Customer segmentation
# --------------------------------------------------

@app.get("/api/analytics/customer-segments")
def customer_segments():
    df = read_report("customer_segments.csv")

    if "segment" not in df.columns:
        raise HTTPException(
            status_code=500,
            detail="Customer segment report has an unexpected schema.",
        )

    segment_counts = (
        df["segment"]
        .fillna("Unknown")
        .value_counts()
        .to_dict()
    )

    # Return aggregate counts only, never individual customer records.
    return {
        "success": True,
        "method": "RFM features with exploratory KMeans clustering",
        "validatedModel": False,
        "customersAnalyzed": int(len(df)),
        "segments": [
            {
                "name": str(name),
                "customers": int(count),
            }
            for name, count in segment_counts.items()
        ],
    }


# --------------------------------------------------
# Food recommendations
# --------------------------------------------------

@app.get("/api/analytics/recommendations")
def food_recommendations(limit: int = 10):
    limit = max(1, min(limit, 30))
    df = read_report("food_recommendations.csv")

    required = {
        "food_name",
        "category",
        "price",
        "recommendation_score",
        "reason",
    }

    if not required.issubset(df.columns):
        raise HTTPException(
            status_code=500,
            detail="Recommendation report has an unexpected schema.",
        )

    foods = (
        df.groupby(["food_name", "category"], dropna=False)
        .agg(
            price=("price", "median"),
            score=("recommendation_score", "mean"),
            recommendation_count=("food_name", "size"),
        )
        .reset_index()
        .sort_values("score", ascending=False)
        .head(limit)
    )

    return {
        "success": True,
        "method": "Popularity and rating baseline",
        "validatedModel": False,
        "recommendations": [
            {
                "foodName": str(row["food_name"]),
                "category": str(row["category"]),
                "price": round(float(row["price"]), 2),
                "score": round(float(row["score"]), 3),
                "recommendationCount": int(
                    row["recommendation_count"]
                ),
            }
            for _, row in foods.iterrows()
        ],
    }


# --------------------------------------------------
# Review sentiment
# --------------------------------------------------

@app.get("/api/analytics/review-sentiment")
def review_sentiment():
    df = read_report("review_sentiment.csv")

    if "sentiment" not in df.columns:
        raise HTTPException(
            status_code=500,
            detail="Review sentiment report has an unexpected schema.",
        )

    counts = (
        df["sentiment"]
        .fillna("Unknown")
        .value_counts()
        .to_dict()
    )

    total = int(len(df))

    return {
        "success": True,
        "method": "Explainable word-lexicon baseline",
        "validatedModel": False,
        "totalReviews": total,
        "sentimentDistribution": [
            {
                "sentiment": str(name),
                "count": int(count),
                "percentage": (
                    round(count * 100 / total, 1)
                    if total else 0
                ),
            }
            for name, count in counts.items()
        ],
    }


# --------------------------------------------------
# Demand forecast with real food names
# --------------------------------------------------

@app.get("/api/analytics/demand-forecast")
def demand_forecast():
    df = read_report("demand_forecast.csv")

    required = {
        "forecast_date",
        "food_id",
        "forecast_quantity",
        "method",
    }

    if not required.issubset(df.columns):
        raise HTTPException(
            status_code=500,
            detail="Demand forecast report has an unexpected schema.",
        )

    df["forecast_date"] = pd.to_datetime(
        df["forecast_date"],
        errors="coerce",
    )

    df["forecast_quantity"] = pd.to_numeric(
        df["forecast_quantity"],
        errors="coerce",
    ).fillna(0)

    # The saved CSV contains IDs; MongoDB supplies the display names.
    food_names = get_food_name_map()

    summary = (
        df.groupby("food_id", dropna=False)
        .agg(
            estimatedUnits=("forecast_quantity", "sum"),
            forecastDays=("forecast_date", "nunique"),
        )
        .reset_index()
    )

    latest_date = df["forecast_date"].max()

    method_values = (
        df["method"]
        .dropna()
        .astype(str)
        .unique()
        .tolist()
    )

    products = []

    for _, row in summary.iterrows():
        products.append({
            "foodName": display_food_name(
                row["food_id"],
                food_names,
            ),
            "estimatedUnits": round(
                float(row["estimatedUnits"]), 2
            ),
            "forecastDays": int(row["forecastDays"]),
        })

    return {
        "success": True,
        "method": (
            method_values[0]
            if method_values
            else "Historical average baseline"
        ),
        "validatedModel": False,
        "historicalDataThrough": (
            latest_date.date().isoformat()
            if pd.notna(latest_date)
            else None
        ),
        "forecastRows": int(len(df)),
        "products": products,
        "note": (
            "Baseline estimates from a saved report, not a "
            "validated live prediction. Food names are resolved "
            "from MongoDB; internal identifiers are not returned."
        ),
    }


# --------------------------------------------------
# Food waste-risk prediction (live from order history)
# --------------------------------------------------

@app.get("/api/analytics/food-waste-prediction")
def food_waste_prediction():
    """
    Estimate surplus waste-risk from sales patterns.

    Observed wastage is not stored in FreshBites; results are risk estimates only.
    """
    try:
        return compute_food_waste_prediction()
    except HTTPException:
        raise
    except ValueError as exc:
        raise HTTPException(
            status_code=503,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=(
                "Food waste-risk prediction could not be completed. "
                "Check MongoDB connectivity and order data."
            ),
        ) from exc


# --------------------------------------------------
# Review summary with real food names
# --------------------------------------------------

@app.get("/api/analytics/review-food-summary")
def review_food_summary():
    df = read_report("food_sentiment_summary.csv")

    required = {
        "food_id",
        "review_count",
        "average_rating",
        "positive_reviews",
        "neutral_reviews",
        "negative_reviews",
    }

    if not required.issubset(df.columns):
        raise HTTPException(
            status_code=500,
            detail=(
                "Food review summary has an unexpected schema. "
                "The CSV must include food_id."
            ),
        )

    food_names = get_food_name_map()
    products = []

    for _, row in df.iterrows():
        products.append({
            "foodName": display_food_name(
                row["food_id"],
                food_names,
            ),
            "reviewCount": int(row["review_count"]),
            "averageRating": (
                round(float(row["average_rating"]), 2)
                if pd.notna(row["average_rating"])
                else None
            ),
            "positiveReviews": int(row["positive_reviews"]),
            "neutralReviews": int(row["neutral_reviews"]),
            "negativeReviews": int(row["negative_reviews"]),
        })

    return {
        "success": True,
        "products": products,
        "note": (
            "Review statistics are aggregated by food. "
            "Customer IDs, review IDs, and review comments are not exposed."
        ),
    }


# --------------------------------------------------
# Shutdown
# --------------------------------------------------

@app.on_event("shutdown")
def shutdown_event():
    global _mongo_client

    try:
        close_mongo_connection()
    finally:
        if _mongo_client is not None:
            _mongo_client.close()
            _mongo_client = None
