import { useCallback, useState } from "react";
import { predictRating } from "@/utils/predictionService";
import type { PredictionInput, PredictionResult } from "@/types/prediction";

export type PredictionStatus = "idle" | "loading" | "success" | "error";

export function usePrediction() {
  const [status, setStatus] = useState<PredictionStatus>("idle");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (input: PredictionInput) => {
    setStatus("loading");
    setError(null);
    setResult(null);
    try {
      const prediction = await predictRating(input);
      setResult(prediction);
      setStatus("success");
    } catch {
      setError("We couldn't generate a verdict. Please try again.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, run, reset };
}