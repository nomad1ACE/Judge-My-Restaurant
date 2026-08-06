import type { PredictionInput, PredictionResult } from "@/types/prediction";

export const MOCK_PREDICTION: PredictionResult = {
  rating: 4.32,
  verdict: "Excellent Restaurant",
  confidence: 92,
  grade: "A",
  summary:
    "This restaurant has strong potential to receive excellent customer ratings due to its balanced pricing, cuisine popularity, and customer engagement.",
  highlights: [
    "Popular cuisine",
    "Strong customer engagement",
    "Online delivery available",
    "Affordable pricing",
  ],
};

/**
 * Simulated prediction endpoint. Swap the body for
 * `fetch("/predict", { method: "POST", body: JSON.stringify(input) })`
 * without touching any UI component.
 */
export async function getMockPrediction(
  _input: PredictionInput,
): Promise<PredictionResult> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return MOCK_PREDICTION;
}