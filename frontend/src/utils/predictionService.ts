import type { PredictionInput, PredictionResult } from "@/types/prediction";

function toApiPayload(input: PredictionInput) {
  return {
    country: input.country,
    country_code: undefined,
    city: input.city,
    cuisines: input.cuisines,
    average_cost_for_two: input.averageCostForTwo,
    currency: undefined,
    has_table_booking: Number(input.hasTableBooking),
    has_online_delivery: Number(input.hasOnlineDelivery),
    is_delivering_now: Number(input.isDeliveringNow),
    price_range: input.priceRange,
    votes: input.votes,
  };
}

const API_BASE = (import.meta as any).env?.VITE_API_URL ?? "http://127.0.0.1:8000";

export async function predictRating(input: PredictionInput): Promise<PredictionResult> {
  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toApiPayload(input)),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return response.json();
}