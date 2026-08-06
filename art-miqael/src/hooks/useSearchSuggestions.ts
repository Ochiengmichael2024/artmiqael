import { useMemo } from "react";
import { ARTWORKS } from "@/data/artworks.data";
import { ARTISTS } from "@/data/artists.data";

export function useSearchSuggestions(query: string) {
  return useMemo(() => {
    if (!query || query.trim().length < 1) return { artworks: [], artists: [] };
    const q = query.trim().toLowerCase();
    return {
      artworks: ARTWORKS.filter((a) => a.title.toLowerCase().includes(q) || a.category.includes(q) || a.style.toLowerCase().includes(q)).slice(0, 4),
      artists: ARTISTS.filter((a) => a.name.toLowerCase().includes(q)).slice(0, 3),
    };
  }, [query]);
}
