import { motion } from "framer-motion";
import { ChefHat } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export function EmptyVerdict() {
  return (
    <GlassCard className="flex min-h-[420px] flex-col items-center justify-center text-center">
      <motion.span
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="grid h-16 w-16 place-items-center rounded-3xl bg-gold/15 text-gold"
      >
        <ChefHat className="h-7 w-7" />
      </motion.span>
      <h2 className="mt-6 text-xl font-bold">Your verdict appears here</h2>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">
        Fill in the restaurant profile and let the model predict your rating, grade and
        confidence score.
      </p>
    </GlassCard>
  );
}