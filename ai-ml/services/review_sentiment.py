
"""FreshBites review sentiment analysis baseline.

Uses an explainable word-lexicon approach. This is not a trained
machine-learning model and should be evaluated before production use.
"""

import re

import pandas as pd

from services.data_loader import get_database, close_mongo_connection
from utils.config import PREDICTIONS_DIR


REVIEW_OUTPUT = PREDICTIONS_DIR / "review_sentiment.csv"
SUMMARY_OUTPUT = PREDICTIONS_DIR / "food_sentiment_summary.csv"

POSITIVE_WORDS = {
    "amazing", "awesome", "best", "delicious", "excellent",
    "fresh", "good", "great", "love", "loved", "nice",
    "perfect", "recommend", "tasty", "wonderful", "yummy",
    "friendly", "fast", "happy", "enjoyed",
}

NEGATIVE_WORDS = {
    "awful", "bad", "bland", "cold", "disappointing",
    "disappointed", "dirty", "dry", "hate", "hated",
    "horrible", "late", "poor", "rude", "salty",
    "slow", "stale", "terrible", "tasteless", "waste",
    "worst", "wrong", "unfresh",
}

NEGATIONS = {
    "not", "no", "never", "hardly", "isn't", "wasn't",
    "don't", "didn't", "doesn't", "cannot", "can't",
}

INTENSIFIERS = {
    "very", "really", "extremely", "super", "too",
}


def analyze_sentiment(comment):
    """Return a simple lexicon-based sentiment label and score."""

    if not isinstance(comment, str) or not comment.strip():
        return "neutral", 0

    words = re.findall(r"[a-zA-Z']+", comment.lower())
    score = 0
    negation_window = 0
    intensity = 1

    for word in words:
        if word in NEGATIONS:
            negation_window = 3
            continue

        if word in INTENSIFIERS:
            intensity = 2
            continue

        word_score = 0

        if word in POSITIVE_WORDS:
            word_score = 1
        elif word in NEGATIVE_WORDS:
            word_score = -1

        if word_score:
            if negation_window > 0:
                word_score *= -1

            score += word_score * intensity
            intensity = 1

        if negation_window > 0:
            negation_window -= 1

    if score > 0:
        return "positive", score

    if score < 0:
        return "negative", score

    return "neutral", 0


def run_sentiment_analysis():
    """Analyze reviews and create review-level and food-level reports."""

    try:
        database = get_database()

        reviews = list(
            database["reviews"].find(
                {},
                {
                    "_id": 1,
                    "food": 1,
                    "rating": 1,
                    "comment": 1,
                    "createdAt": 1,
                },
            )
        )

        if not reviews:
            print("No reviews are available for sentiment analysis.")
            return

        rows = []

        for review in reviews:
            label, score = analyze_sentiment(review.get("comment"))

            food_id = review.get("food")
            rating = review.get("rating")

            try:
                rating = float(rating)
            except (TypeError, ValueError):
                rating = None

            rows.append(
                {
                    "review_id": str(review["_id"]),
                    "food_id": str(food_id) if food_id else "",
                    "rating": rating,
                    "sentiment": label,
                    "sentiment_score": score,
                    "created_at": review.get("createdAt"),
                }
            )

        result = pd.DataFrame(rows)

        PREDICTIONS_DIR.mkdir(parents=True, exist_ok=True)

        # Do not export raw review comments or customer identities.
        result.to_csv(REVIEW_OUTPUT, index=False)

        summary = (
            result.groupby("food_id", as_index=False)
            .agg(
                review_count=("review_id", "count"),
                average_rating=("rating", "mean"),
                positive_reviews=(
                    "sentiment",
                    lambda values: int((values == "positive").sum()),
                ),
                neutral_reviews=(
                    "sentiment",
                    lambda values: int((values == "neutral").sum()),
                ),
                negative_reviews=(
                    "sentiment",
                    lambda values: int((values == "negative").sum()),
                ),
            )
        )

        summary["average_rating"] = summary["average_rating"].round(2)
        summary.to_csv(SUMMARY_OUTPUT, index=False)

        print("FreshBites review sentiment analysis completed.")
        print(f"Reviews analyzed: {len(result)}")

        print("\nSentiment distribution:")
        for label, count in result["sentiment"].value_counts().items():
            print(f"  {label.title()}: {count}")

        print(f"\nReview report: {REVIEW_OUTPUT}")
        print(f"Food summary: {SUMMARY_OUTPUT}")
        print(
            "\nMethod: explainable word-lexicon baseline; "
            "not a trained ML model."
        )

    finally:
        close_mongo_connection()


if __name__ == "__main__":
    run_sentiment_analysis()
