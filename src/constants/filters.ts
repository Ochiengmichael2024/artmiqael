import type { ArtworkStyle, ArtworkOrientation, PriceBand } from "@/types";

export const STYLES: ArtworkStyle[] = ["Abstract", "Figurative", "Minimal", "Nature"];
export const ORIENTATIONS: ArtworkOrientation[] = ["Landscape", "Portrait", "Square"];

export const SIZES: { key: string; label: string }[] = [
  { key: "small", label: "Small works" },
  { key: "medium", label: "Medium works" },
  { key: "statement", label: "Statement works" },
];

export const PRICE_BANDS: PriceBand[] = [
  { key: "under-300", label: "Under $300", test: (p) => p < 300 },
  { key: "300-600", label: "$300 — $600", test: (p) => p >= 300 && p <= 600 },
  { key: "600-1000", label: "$600 — $1,000", test: (p) => p > 600 && p <= 1000 },
  { key: "over-1000", label: "Over $1,000", test: (p) => p > 1000 },
];

export const SORT_OPTIONS = [
  { key: "featured", label: "Featured" },
  { key: "newest", label: "Newest" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "popularity", label: "Popularity" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["key"];

export const DELIVERY_OPTIONS = (freeThreshold: number, subtotal: number) => [
  { key: "standard", label: "Standard", days: "5–10 business days", price: subtotal > freeThreshold ? 0 : 25 },
  { key: "express", label: "Express", days: "2–3 business days", price: 55 },
  { key: "white-glove", label: "White-glove", days: "For statement & mural pieces", price: 140 },
];

export const FREE_SHIPPING_THRESHOLD = 500;
