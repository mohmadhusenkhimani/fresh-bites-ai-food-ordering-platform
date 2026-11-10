
"""FreshBites food recommendation engine."""

import pandas as pd

from services.data_loader import get_database, close_mongo_connection
from utils.config import PREDICTIONS_DIR

OUTPUT_FILE = PREDICTIONS_DIR / "food_recommendations.csv"


def build_food_recommendations(database):
    """Create food rankings and customer-specific recommendations."""

    foods = list(
        database["foods"].find(
            {"isAvailable": True},
            {
                "_id": 1,
                "name": 1,
                "category": 1,
                "price": 1,
                "isAvailable": 1,
            },
        )
    )

    if not foods:
        return pd.DataFrame(
            columns=[
                "customer_id",
                "food_id",
                "food_name",
                "category",
                "price",
                "order_quantity",
                "average_rating",
                "recommendation_score",
                "reason",
            ]
        )

    food_df = pd.DataFrame(foods)
    food_df["food_id"] = food_df["_id"].astype(str)
    food_df = food_df.drop(columns=["_id"])

    # Aggregate quantities from order line items.
    order_rows = []

    for order in database["orders"].find(
        {},
        {"user": 1, "items": 1, "status": 1, "paymentStatus": 1},
    ):
        status = str(order.get("status", "")).strip().lower()
        payment = str(order.get("paymentStatus", "")).strip().lower()

        if status in {"cancelled", "canceled"}:
            continue

        if payment in {"failed", "cancelled", "canceled", "refunded"}:
            continue

        customer_id = order.get("user")

        for item in order.get("items") or []:
            food_id = item.get("foodId")

            if food_id is None:
                continue

            try:
                quantity = max(0, int(item.get("quantity", 0)))
            except (TypeError, ValueError):
                quantity = 0

            order_rows.append(
                {
                    "customer_id": (
                        str(customer_id) if customer_id is not None else None
                    ),
                    "food_id": str(food_id),
                    "quantity": quantity,
                }
            )

    order_df = pd.DataFrame(
        order_rows,
        columns=["customer_id", "food_id", "quantity"],
    )

    if order_df.empty:
        popularity = pd.DataFrame(
            columns=["food_id", "order_quantity"]
        )
        customer_food = pd.DataFrame(
            columns=["customer_id", "food_id", "customer_quantity"]
        )
    else:
        popularity = (
            order_df.groupby("food_id", as_index=False)["quantity"]
            .sum()
            .rename(columns={"quantity": "order_quantity"})
        )

        customer_food = (
            order_df.groupby(
                ["customer_id", "food_id"], as_index=False
            )["quantity"]
            .sum()
            .rename(columns={"quantity": "customer_quantity"})
        )

    # Aggregate review ratings.
    review_rows = []

    for review in database["reviews"].find(
        {},
        {"food": 1, "rating": 1},
    ):
        food_id = review.get("food")
        rating = review.get("rating")

        if food_id is None:
            continue

        try:
            rating = float(rating)
        except (TypeError, ValueError):
            continue

        if 1 <= rating <= 5:
            review_rows.append(
                {"food_id": str(food_id), "rating": rating}
            )

    review_df = pd.DataFrame(
        review_rows, columns=["food_id", "rating"]
    )

    if review_df.empty:
        ratings = pd.DataFrame(
            columns=["food_id", "average_rating"]
        )
    else:
        ratings = (
            review_df.groupby("food_id", as_index=False)["rating"]
            .mean()
            .rename(columns={"rating": "average_rating"})
        )

    result = food_df.merge(popularity, on="food_id", how="left")
    result = result.merge(ratings, on="food_id", how="left")

    result["order_quantity"] = result["order_quantity"].fillna(0)
    result["average_rating"] = result["average_rating"].fillna(0)

    # Normalize popularity so it cannot dominate the score just
    # because order quantities are larger than rating values.
    max_quantity = result["order_quantity"].max()

    if max_quantity > 0:
        result["popularity_score"] = (
            result["order_quantity"] / max_quantity
        )
    else:
        result["popularity_score"] = 0.0

    result["rating_score"] = result["average_rating"] / 5.0

    # A transparent baseline score: 60% popularity, 40% rating.
    result["recommendation_score"] = (
        0.60 * result["popularity_score"]
        + 0.40 * result["rating_score"]
    )

    result["reason"] = result.apply(
        lambda row: (
            "Popular choice and highly rated"
            if row["order_quantity"] > 0
            and row["average_rating"] >= 4
            else (
                "Popular choice"
                if row["order_quantity"] > 0
                else (
                    "Highly rated"
                    if row["average_rating"] >= 4
                    else "Explore this available food"
                )
            )
        ),
        axis=1,
    )

    # Recommend foods not previously ordered or wishlisted by each user.
    user_ids = [
        str(user["_id"])
        for user in database["users"].find({}, {"_id": 1})
    ]

    wishlist_foods = {}

    for entry in database["wishlists"].find(
        {}, {"user": 1, "food": 1}
    ):
        user_id = entry.get("user")
        food_id = entry.get("food")

        if user_id is not None and food_id is not None:
            wishlist_foods.setdefault(str(user_id), set()).add(
                str(food_id)
            )

    recommendation_frames = []

    for customer_id in user_ids:
        previously_ordered = set()

        if not customer_food.empty:
            previously_ordered = set(
                customer_food.loc[
                    customer_food["customer_id"] == customer_id,
                    "food_id",
                ]
            )

        previously_saved = wishlist_foods.get(customer_id, set())

        candidates = result[
            ~result["food_id"].isin(
                previously_ordered | previously_saved
            )
        ].copy()

        if candidates.empty:
            continue

        candidates["customer_id"] = customer_id

        recommendation_frames.append(candidates)

    output_columns = [
        "customer_id",
        "food_id",
        "name",
        "category",
        "price",
        "order_quantity",
        "average_rating",
        "recommendation_score",
        "reason",
    ]

    if recommendation_frames:
        recommendations = pd.concat(
            recommendation_frames, ignore_index=True
        )

        recommendations = recommendations.sort_values(
            ["customer_id", "recommendation_score"],
            ascending=[True, False],
        )

        recommendations = recommendations.rename(
            columns={"name": "food_name"}
        )

        recommendations = recommendations[
            [
                "customer_id",
                "food_id",
                "food_name",
                "category",
                "price",
                "order_quantity",
                "average_rating",
                "recommendation_score",
                "reason",
            ]
        ]

        return recommendations

    return pd.DataFrame(
        columns=[
            "customer_id",
            "food_id",
            "food_name",
            "category",
            "price",
            "order_quantity",
            "average_rating",
            "recommendation_score",
            "reason",
        ]
    )


def run_recommendations():
    try:
        database = get_database()
        recommendations = build_food_recommendations(database)

        OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
        recommendations.to_csv(OUTPUT_FILE, index=False)

        print("FreshBites recommendation engine completed.")
        print(f"Recommendation rows: {len(recommendations)}")

        if not recommendations.empty:
            print(
                f"Customers with recommendations: "
                f"{recommendations['customer_id'].nunique()}"
            )
            print("\nSample recommendations (IDs only):")

            for _, row in recommendations.head(10).iterrows():
                print(
                    f"Food: {row['food_name']} | "
                    f"Score: {row['recommendation_score']:.3f} | "
                    f"Reason: {row['reason']}"
                )

        print(f"\nReport saved to: {OUTPUT_FILE}")

    finally:
        close_mongo_connection()


if __name__ == "__main__":
    run_recommendations()
