import { motion } from "framer-motion";
import { Award, CheckCircle2, Star, Trophy } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useCountUp } from "@/hooks/useCountUp";
import type { PredictionResult } from "@/types/prediction";

export function VerdictCard({ result }: { result: PredictionResult }) {
  const rating = useCountUp(result.rating, 1500, 2);
  const confidence = useCountUp(result.confidence, 1500, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <GlassCard className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-25 blur-3xl"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        />

        <div className="relative">
          <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            AI Verdict
          </p>

          <div className="mt-5 flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.4 }}
              >
                <Star
                  className="h-7 w-7 sm:h-8 sm:w-8"
                  strokeWidth={1.5}
                  fill={index + 1 <= Math.round(result.rating) ? "currentColor" : "none"}
                  color="var(--gold)"
                />
              </motion.span>
            ))}
          </div>

          <p className="mt-4 font-display text-5xl font-extrabold sm:text-6xl">
            {rating.toFixed(2)}
            <span className="ml-2 text-xl font-semibold text-muted-foreground">/ 5</span>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-primary-foreground"
              style={{ backgroundImage: "var(--gradient-gold)" }}
            >
              <Trophy className="h-4 w-4" />
              {result.verdict}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-4 py-2 text-sm font-bold">
              <Award className="h-4 w-4 text-gold" />
              Grade {result.grade}
            </span>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span className="text-muted-foreground">Model confidence</span>
              <span>{Math.round(confidence)}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundImage: "var(--gradient-gold)" }}
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 1.4, ease: "easeOut" }}
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-7 rounded-2xl border border-border bg-surface/60 p-4 text-sm leading-relaxed text-foreground/85"
          >
            {result.summary}
          </motion.p>

          <div className="mt-7">
            <h3 className="text-sm font-bold tracking-wide uppercase">Highlights</h3>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {result.highlights.map((highlight, index) => (
                <motion.li
                  key={highlight}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                  <span className="min-w-0 truncate">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}