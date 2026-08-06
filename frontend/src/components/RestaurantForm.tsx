import { motion } from "framer-motion";
import {
  Bike,
  CalendarCheck,
  Sparkles,
  Timer,
  Utensils,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CuisineChips } from "@/components/CuisineChips";
import { GlassCard } from "@/components/GlassCard";
import { ToggleField } from "@/components/ToggleField";
import {
  CITIES_BY_COUNTRY,
  COUNTRIES,
  CUISINES,
  PRICE_RANGE_LABELS,
} from "@/utils/options";
import type { PredictionInput } from "@/types/prediction";

export function RestaurantForm({
  value,
  onChange,
  onSubmit,
  isLoading,
}: {
  value: PredictionInput;
  onChange: (next: PredictionInput) => void;
  onSubmit: () => void;
  isLoading: boolean;
}) {
  const cities = CITIES_BY_COUNTRY[value.country] ?? [];

  const set = <K extends keyof PredictionInput>(key: K, next: PredictionInput[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <GlassCard>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">Restaurant profile</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Feed the model your details and get an instant verdict.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Restaurant name (optional)</Label>
          <Input
            id="name"
            placeholder="The Copper Spoon"
            value={value.restaurantName}
            onChange={(event) => set("restaurantName", event.target.value)}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Country</Label>
            <Select
              value={value.country}
              onValueChange={(country) =>
                onChange({
                  ...value,
                  country,
                  city: CITIES_BY_COUNTRY[country]?.[0] ?? "",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>City</Label>
            <Select value={value.city} onValueChange={(city) => set("city", city)}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Utensils className="h-4 w-4 text-gold" /> Cuisine
          </Label>
          <CuisineChips
            options={CUISINES}
            selected={value.cuisines}
            onToggle={(cuisine) =>
              set(
                "cuisines",
                value.cuisines.includes(cuisine)
                  ? value.cuisines.filter((item) => item !== cuisine)
                  : [...value.cuisines, cuisine],
              )
            }
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="cost">Average cost for two</Label>
            <Input
              id="cost"
              type="number"
              min={0}
              value={value.averageCostForTwo}
              onChange={(event) =>
                set("averageCostForTwo", Number(event.target.value))
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="votes">Votes</Label>
            <Input
              id="votes"
              type="number"
              min={0}
              value={value.votes}
              onChange={(event) => set("votes", Number(event.target.value))}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Label>Price range</Label>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
              {value.priceRange} · {PRICE_RANGE_LABELS[value.priceRange]}
            </span>
          </div>
          <Slider
            min={1}
            max={4}
            step={1}
            value={[value.priceRange]}
            onValueChange={([next]) => set("priceRange", next ?? 1)}
          />
        </div>

        <div className="grid gap-3">
          <ToggleField
            label="Has online delivery"
            icon={Bike}
            checked={value.hasOnlineDelivery}
            onChange={(next) => set("hasOnlineDelivery", next)}
          />
          <ToggleField
            label="Has table booking"
            icon={CalendarCheck}
            checked={value.hasTableBooking}
            onChange={(next) => set("hasTableBooking", next)}
          />
          <ToggleField
            label="Is delivering now"
            icon={Timer}
            checked={value.isDeliveringNow}
            onChange={(next) => set("isDeliveringNow", next)}
          />
        </div>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
          className="glow-gold flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-base font-bold text-primary-foreground disabled:opacity-70"
          style={{ backgroundImage: "var(--gradient-gold)" }}
        >
          <Sparkles className="h-5 w-5" />
          {isLoading ? "Analyzing…" : "Analyze Restaurant"}
        </motion.button>
      </form>
    </GlassCard>
  );
}