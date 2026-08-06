import React from "react";
import { Star } from "lucide-react";

export interface StarRatingProps {
  rating: number;
  count?: number;
  size?: number;
}

export function StarRating({ rating, count, size = 13 }: StarRatingProps) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="inline-flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={size} fill={i < full ? "#17140F" : "none"} color={i < full ? "#17140F" : "#C7C0AE"} />
        ))}
      </span>
      {typeof count === "number" && <span className="font-mono text-[11px] text-ink-soft">({count})</span>}
    </span>
  );
}
