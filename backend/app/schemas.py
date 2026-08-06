from typing import List, Optional

from pydantic import BaseModel


class RestaurantRequest(BaseModel):
    country: str
    country_code: Optional[int] = None
    city: str
    longitude: Optional[float] = None
    latitude: Optional[float] = None
    cuisines: List[str]

    average_cost_for_two: int
    currency: Optional[str] = None

    has_table_booking: int
    has_online_delivery: int
    is_delivering_now: int

    price_range: int
    votes: int


class PredictionResponse(BaseModel):
    rating: float
    confidence: int
    grade: str
    verdict: str
    summary: str
    highlights: List[str]
