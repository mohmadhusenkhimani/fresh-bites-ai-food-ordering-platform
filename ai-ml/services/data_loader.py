
"""Read FreshBites data from MongoDB without modifying records."""

from functools import lru_cache

from pymongo import MongoClient

from utils.config import (
    AI_ML_DATABASE,
    MONGODB_URI,
    validate_mongodb_config,
)


@lru_cache(maxsize=1)
def get_mongo_client():
    """Create and reuse a MongoDB client."""
    validate_mongodb_config()

    client = MongoClient(
        MONGODB_URI,
        serverSelectionTimeoutMS=10000,
        connectTimeoutMS=10000,
    )

    # Confirm the MongoDB server is reachable.
    client.admin.command("ping")
    return client


def get_database():
    """Return the configured FreshBites database."""
    return get_mongo_client()[AI_ML_DATABASE]


def list_collections():
    """Return collection names without exposing document contents."""
    return sorted(get_database().list_collection_names())


def get_collection_counts():
    """Count documents in each existing collection."""
    database = get_database()

    return {
        name: database[name].count_documents({})
        for name in list_collections()
    }


def close_mongo_connection():
    """Close the cached MongoDB client."""
    if get_mongo_client.cache_info().currsize:
        get_mongo_client().close()
        get_mongo_client.cache_clear()


if __name__ == "__main__":
    try:
        print("Connecting to FreshBites MongoDB...", flush=True)

        collections = list_collections()
        print("\nAvailable collections:", flush=True)

        if collections:
            for collection in collections:
                print(f"  - {collection}", flush=True)
        else:
            print("  No collections found in this database.", flush=True)

        print("\nDocument counts:", flush=True)
        counts = get_collection_counts()

        if counts:
            for name, count in counts.items():
                print(f"  {name}: {count}", flush=True)
        else:
            print("  No documents to count.", flush=True)

        print("\nMongoDB read test completed.", flush=True)

    except Exception as exc:
        print(
            f"\nMongoDB check failed: {type(exc).__name__}: {exc}",
            flush=True,
        )
        raise SystemExit(1)
    finally:
        close_mongo_connection()
