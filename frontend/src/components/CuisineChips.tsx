import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function CuisineChips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = selected.includes(option);
        return (
          <motion.button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-pressed={active}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
              active
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-surface/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
            )}
          >
            {active ? <Check className="h-3 w-3" /> : null}
            {option}
          </motion.button>
        );
      })}
    </div>
  );
}