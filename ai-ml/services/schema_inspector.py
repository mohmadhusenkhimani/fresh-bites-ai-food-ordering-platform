
"""Inspect FreshBites document schemas without printing personal data."""

from services.data_loader import get_database, close_mongo_connection

COLLECTIONS_TO_INSPECT = [
    "foods",
    "orders",
    "reviews",
    "users",
    "wishlists",
]


def describe_value(value, depth=0):
    """Describe a field's type and nested structure, never its value."""
    if value is None:
        return "null"

    if isinstance(value, dict):
        if depth >= 2:
            return "object"

        fields = []
        for key, nested_value in value.items():
            fields.append(
                f"{key}: {describe_value(nested_value, depth + 1)}"
            )

        return "object {" + ", ".join(fields) + "}"

    if isinstance(value, list):
        if not value:
            return "array (empty sample)"

        item_types = sorted({
            describe_value(item, depth + 1)
            for item in value[:3]
        })

        return "array [" + " | ".join(item_types) + "]"

    # Avoid printing document values, including IDs and personal information.
    if type(value).__name__ == "ObjectId":
        return "ObjectId"

    if isinstance(value, bool):
        return "boolean"

    if isinstance(value, int):
        return "integer"

    if isinstance(value, float):
        return "number"

    if isinstance(value, str):
        return "string"

    if hasattr(value, "isoformat"):
        return "date/time"

    return type(value).__name__


def inspect_collection(database, name):
    collection = database[name]
    sample = collection.find_one()

    print(f"\n--- {name} ---")
    print(f"Document count: {collection.count_documents({})}")

    if sample is None:
        print("No documents available to inspect.")
        return

    for field, value in sample.items():
        print(f"  {field}: {describe_value(value)}")


def main():
    try:
        database = get_database()
        print("FreshBites schema inspection")
        print("Field names and types only; document values are not printed.")

        available = set(database.list_collection_names())

        for name in COLLECTIONS_TO_INSPECT:
            if name in available:
                inspect_collection(database, name)
            else:
                print(f"\n--- {name} ---")
                print("Collection does not exist.")

        print("\nSchema inspection completed.")

    finally:
        close_mongo_connection()


if __name__ == "__main__":
    main()
