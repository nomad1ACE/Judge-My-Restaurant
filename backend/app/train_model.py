import argparse
import os
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder

from app.custom_transformers import CuisineTransformer

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DATA_PATH = Path(os.environ.get("DATASET_PATH", "/home/nomad/Desktop/internship/data/Dataset .csv"))
MODEL_OUTPUT = PROJECT_ROOT / "models" / "restaurant_pipeline.pkl"
ARTIFACT_DIR = PROJECT_ROOT / "models"
CUISINE_ENCODER_PATH = ARTIFACT_DIR / "cuisine_encoder.pkl"
FEATURE_COLUMNS_PATH = ARTIFACT_DIR / "feature_columns.pkl"
MODEL_PATH = ARTIFACT_DIR / "random_forest_model.pkl"

NUMERIC_COLUMNS = [
    "Country Code",
    "Longitude",
    "Latitude",
    "Average Cost for two",
    "Has Table booking",
    "Has Online delivery",
    "Is delivering now",
    "Price range",
    "Votes",
]
CATEGORICAL_COLUMNS = ["City", "Currency"]
CUISINE_COLUMN = ["Cuisines"]
TARGET_COLUMN = "Aggregate rating"

YES_NO_COLUMNS = ["Has Table booking", "Has Online delivery", "Is delivering now"]


def yes_no_to_int(value):
    if isinstance(value, str):
        value = value.strip().lower()
        if value == "yes":
            return 1
        if value == "no":
            return 0
    try:
        return int(value)
    except Exception:
        return 0


def parse_cuisines(value):
    if pd.isna(value):
        return []
    if isinstance(value, list):
        return [str(x).strip() for x in value if str(x).strip()]
    return [item.strip() for item in str(value).split(",") if item.strip()]


def load_data(data_path: Path) -> pd.DataFrame:
    print(f"Loading data from: {data_path}")
    df = pd.read_csv(data_path)

    if TARGET_COLUMN not in df.columns:
        raise ValueError(f"Target column '{TARGET_COLUMN}' not found")

    df = df.dropna(subset=NUMERIC_COLUMNS + CATEGORICAL_COLUMNS + CUISINE_COLUMN + [TARGET_COLUMN])
    df = df[df[TARGET_COLUMN] > 0]

    for col in YES_NO_COLUMNS:
        if col in df.columns:
            df[col] = df[col].apply(yes_no_to_int)

    df["Cuisines"] = df["Cuisines"].apply(parse_cuisines)
    df[CATEGORICAL_COLUMNS] = df[CATEGORICAL_COLUMNS].astype(str).fillna("")

    return df


def build_pipeline() -> Pipeline:
    preprocessor = ColumnTransformer(
        transformers=[
            ("cuisine", CuisineTransformer(), CUISINE_COLUMN),
            (
                "categorical",
                OneHotEncoder(handle_unknown="ignore", sparse_output=False),
                CATEGORICAL_COLUMNS,
            ),
            ("numeric", "passthrough", NUMERIC_COLUMNS),
        ],
        remainder="drop",
    )

    model = RandomForestRegressor(random_state=42, n_estimators=200, n_jobs=-1)
    return Pipeline([("preprocessor", preprocessor), ("model", model)])


def train(data_path: Path, output_path: Path):
    df = load_data(data_path)
    X = df[CUISINE_COLUMN + CATEGORICAL_COLUMNS + NUMERIC_COLUMNS]
    y = df[TARGET_COLUMN].astype(float)

    print(f"Training on {len(X)} rows")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    pipeline = build_pipeline()
    pipeline.fit(X_train, y_train)

    predictions = pipeline.predict(X_test)
    mse = mean_squared_error(y_test, predictions)
    r2 = r2_score(y_test, predictions)

    preprocessor = pipeline.named_steps["preprocessor"]
    cuisine_encoder = preprocessor.named_transformers_["cuisine"].mlb
    feature_columns = list(preprocessor.get_feature_names_out())
    model = pipeline.named_steps["model"]

    print(f"Test MSE: {mse:.4f}")
    print(f"Test R2: {r2:.4f}")
    print(f"Saving trained pipeline to: {output_path}")
    print(f"Saving model artifacts to: {ARTIFACT_DIR}")

    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(cuisine_encoder, CUISINE_ENCODER_PATH)
    joblib.dump(feature_columns, FEATURE_COLUMNS_PATH)
    joblib.dump(model, MODEL_PATH)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, output_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train restaurant rating prediction model")
    parser.add_argument(
        "--data-path",
        type=Path,
        default=DEFAULT_DATA_PATH,
        help="Path to the training CSV dataset",
    )
    parser.add_argument(
        "--output-path",
        type=Path,
        default=MODEL_OUTPUT,
        help="Path to save the trained pipeline",
    )
    args = parser.parse_args()
    train(args.data_path, args.output_path)
