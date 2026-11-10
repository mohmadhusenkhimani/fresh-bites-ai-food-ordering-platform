
"""FreshBites customer segmentation using RFM and K-Means."""

from datetime import datetime, timezone

import numpy as np
import pandas as pd
from bson import ObjectId
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

from services.data_loader import get_database, close_mongo_connection
from utils.config import PREDICTIONS_DIR


OUTPUT_FILE = PREDICTIONS_DIR / "customer_segments.csv"

RFM_FEATURES = ["recency_days", "frequency", "monetary"]


def load_customer_rfm(database):
    """Build RFM features without loading customer names or email addresses."""

    # Include registered users, even if they have never placed an order.
    user_ids = [
        str(user["_id"])
        for user in database["users"].find({}, {"_id": 1})
    ]

    orders = list(
        database["orders"].find(
            {},
            {
                "user": 1,
                "createdAt": 1,
                "total": 1,
                "status": 1,
                "paymentStatus": 1,
            },
        )
    )

    if not user_ids and not orders:
        return pd.DataFrame(columns=["customer_id"] + RFM_FEATURES)

    order_df = pd.DataFrame(orders)

    if order_df.empty:
        order_df = pd.DataFrame(
            columns=["user", "createdAt", "total", "status", "paymentStatus"]
        )

    if not order_df.empty:
        # Exclude orders explicitly cancelled or financially invalid.
        status = (
            order_df.get("status", pd.Series(index=order_df.index, dtype=str))
            .fillna("")
            .astype(str)
            .str.strip()
            .str.lower()
        )
        payment = (
            order_df.get(
                "paymentStatus",
                pd.Series(index=order_df.index, dtype=str),
            )
            .fillna("")
            .astype(str)
            .str.strip()
            .str.lower()
        )

        excluded_statuses = {"cancelled", "canceled"}
        excluded_payments = {
            "failed", "cancelled", "canceled", "refunded"
        }

        order_df = order_df[
            ~status.isin(excluded_statuses)
            & ~payment.isin(excluded_payments)
        ].copy()

        order_df["customer_id"] = order_df["user"].map(
            lambda value: str(value) if value is not None else None
        )
        order_df["order_date"] = pd.to_datetime(
            order_df.get("createdAt"),
            errors="coerce",
            utc=True,
        )
        order_df["total"] = pd.to_numeric(
            order_df.get("total"),
            errors="coerce",
        ).fillna(0).clip(lower=0)

        order_df = order_df.dropna(
            subset=["customer_id", "order_date"]
        )

    else:
        order_df["customer_id"] = pd.Series(dtype=str)
        order_df["order_date"] = pd.Series(dtype="datetime64[ns, UTC]")
        order_df["total"] = pd.Series(dtype=float)

    # Reference date is the day after the most recent valid order.
    if not order_df.empty:
        reference_date = (
            order_df["order_date"].max().normalize()
            + pd.Timedelta(days=1)
        )
        grouped = order_df.groupby("customer_id").agg(
            last_order=("order_date", "max"),
            frequency=("order_date", "size"),
            monetary=("total", "sum"),
        )
        grouped["recency_days"] = (
            reference_date - grouped["last_order"]
        ).dt.days.clip(lower=0)
        grouped = grouped.reset_index()
    else:
        grouped = pd.DataFrame(
            columns=[
                "customer_id", "recency_days", "frequency", "monetary"
            ]
        )

    # Retain registered customers with no eligible orders.
    result = pd.DataFrame({"customer_id": user_ids})

    result = result.merge(
        grouped[["customer_id"] + RFM_FEATURES],
        on="customer_id",
        how="left",
    )

    # No-order customers receive zero frequency and monetary value.
    # Their recency is set beyond the observed order-recency range.
    max_recency = (
        int(grouped["recency_days"].max())
        if not grouped.empty
        else 0
    )

    result["recency_days"] = (
        result["recency_days"].fillna(max_recency + 30)
    )
    result["frequency"] = result["frequency"].fillna(0)
    result["monetary"] = result["monetary"].fillna(0)

    for column in RFM_FEATURES:
        result[column] = pd.to_numeric(
            result[column], errors="coerce"
        ).fillna(0)

    return result


def assign_segments(rfm):
    """Cluster customers and assign readable labels based on cluster profiles."""

    result = rfm.copy()
    result["segment"] = "Insufficient Data"

    if result.empty:
        return result

    result["cluster"] = -1

    # Log transforms reduce the influence of very large purchase values.
    features = pd.DataFrame(index=result.index)
    features["recency_days"] = np.log1p(
        result["recency_days"].clip(lower=0)
    )
    features["frequency"] = np.log1p(
        result["frequency"].clip(lower=0)
    )
    features["monetary"] = np.log1p(
        result["monetary"].clip(lower=0)
    )

    # K-Means needs at least two distinct feature vectors.
    unique_count = len(features.drop_duplicates())

    if len(features) < 2 or unique_count < 2:
        result["segment"] = "Insufficient Data"
        return result

    cluster_count = min(4, unique_count)

    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    model = KMeans(
        n_clusters=cluster_count,
        random_state=42,
        n_init=10,
    )
    result["cluster"] = model.fit_predict(scaled)

    # Score clusters: recent, frequent, high-spending customers rank higher.
    centroids = pd.DataFrame(
        model.cluster_centers_,
        columns=RFM_FEATURES,
    )
    centroids["score"] = (
        -centroids["recency_days"]
        + centroids["frequency"]
        + centroids["monetary"]
    )

    ranked_clusters = centroids["score"].sort_values().index.tolist()

    labels_by_count = {
        2: ["Needs Attention", "Loyal Customers"],
        3: [
            "Needs Attention",
            "Occasional Customers",
            "Loyal Customers",
        ],
        4: [
            "Needs Attention",
            "Occasional Customers",
            "Potential Loyalists",
            "Loyal Customers",
        ],
    }

    labels = labels_by_count[cluster_count]

    for cluster_id, label in zip(ranked_clusters, labels):
        result.loc[result["cluster"] == cluster_id, "segment"] = label

    return result


def run_segmentation():
    """Run segmentation and save a local CSV report."""

    try:
        database = get_database()
        rfm = load_customer_rfm(database)

        if rfm.empty:
            print("No registered customers found.")
            return

        result = assign_segments(rfm)
        result.to_csv(OUTPUT_FILE, index=False)

        print("FreshBites customer segmentation completed.")
        print(f"Customers analyzed: {len(result)}")
        print("\nSegment counts:")

        for segment, count in result["segment"].value_counts().items():
            print(f"  {segment}: {count}")

        print(f"\nReport saved to: {OUTPUT_FILE}")

        print(
            "\nNote: These segments are exploratory and should not "
            "be treated as validated business predictions."
        )

    finally:
        close_mongo_connection()


if __name__ == "__main__":
    run_segmentation()
