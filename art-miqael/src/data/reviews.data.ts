import type { Review } from "@/types";

const REVIEW_POOL: Review[] = [
  { name: "J. Whitfield", text: "Even better in person than the photos suggested. Framed it simply and it anchors the whole room." },
  { name: "R. Adeyemi", text: "Packaging was excellent, arrived with zero damage. Colour is slightly warmer in person, in a good way." },
  { name: "C. Moreau", text: "Bought this as a gift and ended up wanting one for myself. Beautiful weight to the paper." },
  { name: "T. Björk", text: "Shipping took a little longer than expected but the piece itself is exactly as described." },
  { name: "S. Kapoor", text: "The scale is bigger than I pictured — measure your wall twice, it's worth it." },
  { name: "M. Nakamura", text: "Second piece I've bought from this artist. Consistent quality and honest colour representation." },
];

/** Deterministic per-artwork subset so reviews stay stable across renders without a backend. */
export function reviewsFor(artworkId: string): Review[] {
  const n = parseInt(artworkId.slice(1), 10) || 0;
  const count = 2 + (n % 2);
  return Array.from({ length: count }, (_, i) => REVIEW_POOL[(n + i) % REVIEW_POOL.length]);
}
