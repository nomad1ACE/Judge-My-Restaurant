export type PredictionInput = {
  restaurantName: string;
  country: string;
  city: string;
  cuisines: string[];
  averageCostForTwo: number;
  votes: number;
  priceRange: number;
  hasOnlineDelivery: boolean;
  hasTableBooking: boolean;
  isDeliveringNow: boolean;
};

export type PredictionResult = {
  rating: number;
  verdict: string;
  confidence: number;
  grade: string;
  summary: string;
  highlights: string[];
};