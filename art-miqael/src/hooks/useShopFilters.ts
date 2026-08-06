import { useEffect, useMemo, useState } from "react";
import type { ShopFilters, Artwork } from "@/types";
import type { SortKey } from "@/constants/filters";
import { artworkService } from "@/services/artwork.service";

const EMPTY_FILTERS: ShopFilters = { category: [], style: [], orientation: [], size: [], price: [], availability: [] };
const PER_PAGE = 12;

export function useShopFilters(initialCategory: string | null, search: string) {
  const [filters, setFilters] = useState<ShopFilters>({ ...EMPTY_FILTERS, category: initialCategory ? [initialCategory] : [] });
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFilters((f) => ({ ...f, category: initialCategory ? [initialCategory] : [] }));
    setPage(1);
  }, [initialCategory, search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    artworkService.filterAndSort(filters, sort, search).then((list) => {
      if (!cancelled) {
        setResults(list);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [filters, sort, search]);

  const activeFilterCount = useMemo(() => Object.values(filters).reduce((sum, arr) => sum + arr.length, 0), [filters]);
  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
  const pageItems = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function toggleFilter(key: keyof ShopFilters, value: string) {
    setFilters((f) => ({ ...f, [key]: f[key].includes(value) ? f[key].filter((v) => v !== value) : [...f[key], value] }));
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
  }

  return {
    filters, toggleFilter, clearFilters, activeFilterCount,
    sort, setSort, view, setView,
    page, setPage, totalPages, pageItems, resultCount: results.length, loading,
  };
}
