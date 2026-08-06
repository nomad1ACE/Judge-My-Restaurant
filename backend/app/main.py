from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.prediction_service import predict_rating
from app.schemas import PredictionResponse, RestaurantRequest
from app.verdict import generate_verdict

app = FastAPI(
    title="Judge My Restaurant API",
    version="1.0.0"
)

# Allow frontend dev server to call the API during development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8082", "http://127.0.0.1:8082", "http://localhost:8081"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Judge My Restaurant API is running."
    }


@app.post("/predict", response_model=PredictionResponse)
def predict(request: RestaurantRequest):
    prediction = predict_rating(request)
    verdict = generate_verdict(prediction["rating"])

    return {
        "rating": prediction["rating"],
        "confidence": prediction["confidence"],
        "highlights": prediction["highlights"],
        **verdict,
    }