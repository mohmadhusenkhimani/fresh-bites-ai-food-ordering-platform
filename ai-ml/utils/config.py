
"""Configuration for the FreshBites AI/ML module."""

import os
from pathlib import Path
from dotenv import load_dotenv

AI_ML_DIR = Path(__file__).resolve().parents[1]
PROJECT_ROOT = AI_ML_DIR.parent
BACKEND_DIR = PROJECT_ROOT / "backend"

DATASETS_DIR = AI_ML_DIR / "datasets"
MODELS_DIR = AI_ML_DIR / "models"
PREDICTIONS_DIR = AI_ML_DIR / "predictions"

# Load existing project environment variables safely.
for env_file in (
    BACKEND_DIR / ".env",
    PROJECT_ROOT / ".env",
    AI_ML_DIR / ".env",
):
    if env_file.is_file():
        load_dotenv(env_file, override=False)

MONGODB_URI = (
    os.getenv("MONGO_URI")
    or os.getenv("MONGODB_URI")
    or os.getenv("MONGODB_URL")
)

# Your existing MongoDB URI identifies the database as "freshbites".
MONGODB_DATABASE = (
    os.getenv("MONGODB_DB")
    or os.getenv("MONGODB_DATABASE")
    or os.getenv("DB_NAME")
    or "freshbites"
)

AI_ML_DATABASE = os.getenv("AI_ML_DATABASE") or MONGODB_DATABASE

for directory in (DATASETS_DIR, MODELS_DIR, PREDICTIONS_DIR):
    directory.mkdir(parents=True, exist_ok=True)


def validate_mongodb_config():
    """Validate configuration without displaying secrets."""
    if not MONGODB_URI:
        raise ValueError(
            "MongoDB URI is missing. Check backend/.env and the MONGO_URI variable."
        )

    if not AI_ML_DATABASE:
        raise ValueError("MongoDB database name is missing.")

    return True
