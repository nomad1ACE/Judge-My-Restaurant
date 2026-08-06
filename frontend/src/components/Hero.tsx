import { motion } from "framer-motion";
import { Sparkles, ArrowDown } from "lucide-react";

export function Hero({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative mx-auto max-w-5xl px-5 pt-20 pb-14 text-center sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass mx-auto mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
      >
        <Sparkles className="h-3.5 w-3.5 text-gold" />
        Random Forest Regression
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.08 }}
        className="text-4xl leading-[1.05] font-extrabold sm:text-6xl lg:text-7xl"
      >
        <span aria-hidden="true">🍽 </span>
        <span className="text-gradient-gold">Judge My Restaurant</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.16 }}
        className="mx-auto mt-6 max-w-2xl text-lg font-medium text-foreground/85 sm:text-2xl"
      >
        Predict your restaurant's rating before your customers do.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.26 }}
        className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base"
      >
        Powered by Machine Learning using a Random Forest Regression model.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.34 }}
        className="mt-10"
      >
        <motion.button
          type="button"
          onClick={onStart}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="glow-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-primary-foreground transition-colors"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          Judge My Restaurant
          <ArrowDown className="h-4 w-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}