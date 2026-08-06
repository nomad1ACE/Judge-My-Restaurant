import numpy as np
import pandas as pd
from typing import Dict, Optional

from app.model_loader import get_model_artifacts
from app.schemas import RestaurantRequest

COUNTRY_DEFAULTS: Dict[str, Dict[str, object]] = {
    "India": {
        "code": 356,
        "currency": "INR",
        "city_coords": {
            "New Delhi": (28.6139, 77.2090),
            "Mumbai": (19.0760, 72.8777),
            "Bengaluru": (12.9716, 77.5946),
            "Hyderabad": (17.3850, 78.4867),
            "Kolkata": (22.5726, 88.3639),
            "Jaipur": (26.9124, 75.7873),
        },
    },
    "United States": {
        "code": 840,
        "currency": "USD",
        "city_coords": {
            "New York": (40.7128, -74.0060),
            "San Francisco": (37.7749, -122.4194),
            "Chicago": (41.8781, -87.6298),
            "Austin": (30.2672, -97.7431),
            "Seattle": (47.6062, -122.3321),
        },
    },
    "United Arab Emirates": {
        "code": 784,
        "currency": "AED",
        "city_coords": {
            "Dubai": (25.2048, 55.2708),
            "Abu Dhabi": (24.4539, 54.3773),
            "Sharjah": (25.3463, 55.4209),
        },
    },
    "United Kingdom": {
        "code": 826,
        "currency": "GBP",
        "city_coords": {
            "London": (51.5074, -0.1278),
            "Manchester": (53.4808, -2.2426),
            "Edinburgh": (55.9533, -3.1883),
        },
    },
    "Australia": {
        "code": 36,
        "currency": "AUD",
        "city_coords": {
            "Sydney": (-33.8688, 151.2093),
            "Melbourne": (-37.8136, 144.9631),
            "Brisbane": (-27.4698, 153.0251),
        },
    },
    "Singapore": {
        "code": 702,
        "currency": "SGD",
        "city_coords": {
            "Singapore": (1.3521, 103.8198),
        },
    },
    "Brazil": {
        "code": 76,
        "currency": "BRL",
        "city_coords": {
            "São Paulo": (-23.5505, -46.6333),
            "Rio de Janeiro": (-22.9068, -43.1729),
            "Brasília": (-15.7942, -47.8822),
        },
    },
    "South Africa": {
        "code": 710,
        "currency": "ZAR",
        "city_coords": {
            "Cape Town": (-33.9249, 18.4241),
            "Johannesburg": (-26.2041, 28.0473),
            "Durban": (-29.8587, 31.0218),
        },
    },
}


def _to_int_flag(value: bool | int) -> int:
    if isinstance(value, bool):
        return int(value)

    try:
        return int(value)
    except (TypeError, ValueError):
        return 0


def _get_country_defaults(country: str) -> Dict[str, object]:
    return COUNTRY_DEFAULTS.get(country, {
        "code": 0,
        "currency": "USD",
        "city_coords": {},
    })


def _resolve_coordinates(country: str, city: str, latitude: Optional[float], longitude: Optional[float]) -> tuple[float, float]:
    if latitude is not None and longitude is not None:
        return latitude, longitude

    country_defaults = _get_country_defaults(country)
    coords = country_defaults.get("city_coords", {}).get(city)
    if coords:
        return coords

    return 0.0, 0.0


def _resolve_currency(country: str, currency: Optional[str]) -> str:
    if currency:
        return currency

    return str(_get_country_defaults(country).get("currency", "USD"))


def _resolve_country_code(country: str, country_code: Optional[int]) -> int:
    if country_code is not None:
        return country_code

    return int(_get_country_defaults(country).get("code", 0))


def _build_raw_feature_dict(request: RestaurantRequest) -> dict:
    latitude, longitude = _resolve_coordinates(
        request.country,
        request.city,
        request.latitude,
        request.longitude,
    )

    return {
        "Country Code": _resolve_country_code(request.country, request.country_code),
        "Longitude": longitude,
        "Latitude": latitude,
        "Average Cost for two": request.average_cost_for_two,
        "Has Table booking": _to_int_flag(request.has_table_booking),
        "Has Online delivery": _to_int_flag(request.has_online_delivery),
        "Is delivering now": _to_int_flag(request.is_delivering_now),
        "Price range": request.price_range,
        "Votes": request.votes,
        "City": request.city,
        "Currency": _resolve_currency(request.country, request.currency),
        "Cuisines": request.cuisines,
    }


def _build_feature_vector(request: RestaurantRequest, artifacts: dict) -> np.ndarray:
    feature_columns = artifacts["feature_columns"]
    cuisine_encoder = artifacts["cuisine_encoder"]
    raw = _build_raw_feature_dict(request)

    values = pd.Series(0.0, index=feature_columns)
    for name in [
        "Country Code",
        "Longitude",
        "Latitude",
        "Average Cost for two",
        "Has Table booking",
        "Has Online delivery",
        "Is delivering now",
        "Price range",
        "Votes",
    ]:
        if name in values.index:
            values[name] = raw[name]

    city_feature = f"City_{raw['City']}"
    if city_feature in values.index:
        values[city_feature] = 1.0

    currency_feature = f"Currency_{raw['Currency']}"
    if currency_feature in values.index:
        values[currency_feature] = 1.0

    known_cuisines = set(cuisine_encoder.classes_)
    cuisines = [c for c in raw["Cuisines"] if c in known_cuisines]
    encoded_cuisines = cuisine_encoder.transform([cuisines])[0]
    for cuisine, active in zip(cuisine_encoder.classes_, encoded_cuisines):
        if active and cuisine in values.index:
            values[cuisine] = 1.0

    return values.to_numpy().reshape(1, -1)


def _compute_confidence(model, vector: np.ndarray) -> int:
    try:
        if not hasattr(model, "estimators_"):
            return 90

        predictions = np.asarray([est.predict(vector) for est in model.estimators_])
        uncertainty = float(predictions.std(ddof=0))
        confidence = int(max(60, min(98, 100 - uncertainty * 20)))
        return confidence
    except Exception:
        return 90


def _generate_highlights(request: RestaurantRequest, rating: float) -> list[str]:
    highlights = []

    if request.cuisines:
        highlights.append(f"{request.cuisines[0]} cuisine included")

    if request.has_online_delivery:
        highlights.append("Online delivery available")
    else:
        highlights.append("No online delivery")

    if request.has_table_booking:
        highlights.append("Table booking available")

    if request.is_delivering_now:
        highlights.append("Delivering now")

    if rating >= 4.5:
        highlights.append("Outstanding customer satisfaction potential")
    elif rating >= 4.0:
        highlights.append("Strong likelihood of positive reviews")
    elif rating >= 3.0:
        highlights.append("Solid restaurant performance")
    else:
        highlights.append("Opportunity to improve customer experience")

    return highlights[:5]


def predict_rating(request: RestaurantRequest) -> dict:
    artifacts = get_model_artifacts()
    model = artifacts["model"]
    vector = _build_feature_vector(request, artifacts)

    try:
        rating = float(model.predict(vector)[0])
    except Exception:
        rating = 3.5 + min(1.0, max(-1.0, (request.votes / 1000.0) - 0.1))

    rating = float(round(max(1.0, min(5.0, rating)), 2))
    return {
        "rating": rating,
        "confidence": _compute_confidence(model, vector),
        "highlights": _generate_highlights(request, rating),
    }
