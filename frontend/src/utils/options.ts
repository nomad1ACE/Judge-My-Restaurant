export const COUNTRIES = [
  "India",
  "United States",
  "United Arab Emirates",
  "United Kingdom",
  "Australia",
  "Singapore",
  "Brazil",
  "South Africa",
] as const;

export const CITIES_BY_COUNTRY: Record<string, string[]> = {
  India: ["New Delhi", "Mumbai", "Bengaluru", "Hyderabad", "Kolkata", "Jaipur"],
  "United States": ["New York", "San Francisco", "Chicago", "Austin", "Seattle"],
  "United Arab Emirates": ["Dubai", "Abu Dhabi", "Sharjah"],
  "United Kingdom": ["London", "Manchester", "Edinburgh"],
  Australia: ["Sydney", "Melbourne", "Brisbane"],
  Singapore: ["Singapore"],
  Brazil: ["São Paulo", "Rio de Janeiro", "Brasília"],
  "South Africa": ["Cape Town", "Johannesburg", "Durban"],
};

export const CUISINES = [
  "North Indian",
  "Italian",
  "Chinese",
  "Japanese",
  "Mexican",
  "Cafe",
  "Desserts",
  "BBQ",
  "Seafood",
  "Fast Food",
  "Mediterranean",
  "Vegan",
];

export const PRICE_RANGE_LABELS: Record<number, string> = {
  1: "Budget",
  2: "Moderate",
  3: "Upscale",
  4: "Fine Dining",
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}