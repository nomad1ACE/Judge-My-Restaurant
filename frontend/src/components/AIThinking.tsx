import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Check, Loader2 } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

const STEPS = [
  "🤖 Initializing AI...",
  "Analyzing restaurant profile...",
  "Evaluating cuisine...",
  "Checking pricing...",
  "Analyzing customer engagement...",
  "Generating verdict...",
  "Prediction complete.",
];

export function AIThinking() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((current) => Math.min(current + 1, STEPS.length - 1));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard>
      <div className="flex items-center gap-3">
        <motion.span
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/15 text-primary"
        >
          <Bot className="h-5 w-5" />
        </motion.span>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-bold">AI is thinking</h2>
          <p className="text-xs text-muted-foreground">Running the regression model</p>
        </div>
      </div>

      <ul className="mt-7 space-y-3">
        {STEPS.slice(0, step + 1).map((message, index) => {
          const done = index < step;
          return (
            <motion.li
              key={message}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 text-sm"
            >
              {done ? (
                <Check className="h-4 w-4 shrink-0 text-success" />
              ) : (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-primary" />
              )}
              <span className={done ? "text-muted-foreground" : "font-semibold"}>
                {message}
              </span>
            </motion.li>
          );
        })}
      </ul>

      <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundImage: "var(--gradient-gold)" }}
          initial={{ width: "4%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>
    </GlassCard>
  );
}