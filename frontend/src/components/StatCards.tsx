import { motion } from "framer-motion";
import { Coins, ThumbsUp, TrendingUp, Utensils } from "lucide-react";
import { PRICE_RANGE_LABELS, formatCurrency } from "@/utils/options";
import type { PredictionInput } from "@/types/prediction";

export function StatCards({ input }: { input: PredictionInput }) {
  const stats = [
    {
      label: "Average cost",
      value: formatCurrency(input.averageCostForTwo),
      hint: "for two",
      icon: Coins,
    },
    {
      label: "Votes",
      value: formatCurrency(input.votes),
      hint: "customer signals",
      icon: ThumbsUp,
    },
    {
      label: "Price range",
      value: `${input.priceRange}/4`,
      hint: PRICE_RANGE_LABELS[input.priceRange],
      icon: TrendingUp,
    },
    {
      label: "Cuisine",
      value: String(input.cuisines.length || 0),
      hint: input.cuisines.slice(0, 2).join(", ") || "none selected",
      icon: Utensils,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 * index }}
          whileHover={{ y: -4 }}
          className="glass rounded-3xl p-4 sm:p-5"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold/15 text-gold">
            <stat.icon className="h-4 w-4" />
          </span>
          <p className="mt-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {stat.label}
          </p>
          <p className="mt-1 text-2xl font-extrabold">{stat.value}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{stat.hint}</p>
        </motion.div>
      ))}
    </div>
  );
}