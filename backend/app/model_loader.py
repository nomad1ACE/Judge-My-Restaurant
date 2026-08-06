import joblib
from pathlib import Path

MODEL_DIR = Path(__file__).resolve().parent.parent / "models"
CUISINE_ENCODER_PATH = MODEL_DIR / "cuisine_encoder.pkl"
FEATURE_COLUMNS_PATH = MODEL_DIR / "feature_columns.pkl"
MODEL_PATH = MODEL_DIR / "random_forest_model.pkl"

cuisine_encoder = joblib.load(CUISINE_ENCODER_PATH)
feature_columns = joblib.load(FEATURE_COLUMNS_PATH)
model = joblib.load(MODEL_PATH)


def get_model_artifacts():
    """
    Returns the saved model artifacts required for prediction.
    """
    return {
        "cuisine_encoder": cuisine_encoder,
        "feature_columns": feature_columns,
        "model": model,
    }