import { createFileRoute } from "@tanstack/react-router";
import { JudgeRestaurant } from "@/pages/JudgeRestaurant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Judge My Restaurant — Predict Your Rating with AI" },
      {
        name: "description",
        content:
          "Enter your restaurant's cuisine, pricing and engagement details and get an instant AI rating prediction, grade and confidence score.",
      },
      { property: "og:title", content: "Judge My Restaurant — Predict Your Rating with AI" },
      {
        property: "og:description",
        content:
          "Instant AI verdict on your restaurant's expected rating, grade, confidence and highlights.",
      },
    ],
  }),
  component: JudgeRestaurant,
});
