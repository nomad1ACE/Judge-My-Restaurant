import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { RestaurantForm } from "@/components/RestaurantForm";
import { AIThinking } from "@/components/AIThinking";
import { VerdictCard } from "@/components/VerdictCard";
import { EmptyVerdict } from "@/components/EmptyVerdict";
import { StatCards } from "@/components/StatCards";
import { usePrediction } from "@/hooks/usePrediction";
import type { PredictionInput } from "@/types/prediction";

const INITIAL_INPUT: PredictionInput = {
  restaurantName: "",
  country: "India",
  city: "New Delhi",
  cuisines: ["North Indian", "Cafe"],
  averageCostForTwo: 1200,
  votes: 480,
  priceRange: 2,
  hasOnlineDelivery: true,
  hasTableBooking: false,
  isDeliveringNow: true,
};

export function JudgeRestaurant() {
  const [input, setInput] = useState<PredictionInput>(INITIAL_INPUT);
  const { status, result, error, run } = usePrediction();
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <main className="min-h-screen pb-24">
      <Hero
        onStart={() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />

      <div ref={formRef} className="mx-auto max-w-6xl scroll-mt-8 px-5">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
          >
            <RestaurantForm
              value={input}
              onChange={setInput}
              onSubmit={() => run(input)}
              isLoading={status === "loading"}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 lg:sticky lg:top-8"
          >
            <AnimatePresence mode="wait">
              {status === "loading" ? (
                <motion.div key="loading" exit={{ opacity: 0, y: -12 }}>
                  <AIThinking />
                </motion.div>
              ) : status === "success" && result ? (
                <motion.div key="result" className="space-y-6">
                  <VerdictCard result={result} />
                  <StatCards input={input} />
                </motion.div>
              ) : status === "error" ? (
                <motion.div
                  key="error"
                  className="glass rounded-3xl p-8 text-sm text-destructive"
                >
                  {error}
                </motion.div>
              ) : (
                <motion.div key="empty" exit={{ opacity: 0 }}>
                  <EmptyVerdict />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </main>
  );
}