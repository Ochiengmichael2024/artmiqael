import React, { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { SlidersHorizontal, Grid2x2, List, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArtworkGrid } from "@/components/common/ArtworkCard";
import { Pagination } from "@/components/common/Pagination";
import { ROUTES } from "@/constants/routes";
import { SORT_OPTIONS, type SortKey } from "@/constants/filters";
import { categoryLabel } from "@/data/categories.data";
import { useShopFilters } from "@/hooks/useShopFilters";
import { FilterSidebar } from "./FilterSidebar";

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  const search = searchParams.get("search") ?? "";
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { filters, toggleFilter, clearFilters, activeFilterCount, sort, setSort, view, setView, page, setPage, totalPages, pageItems, resultCount, loading } =
    useShopFilters(category, search);

  const catLabel = category ? categoryLabel(category) : null;

  return (
    <Container className="pt-6">
      <Breadcrumbs
        items={[
          { label: "Home", to: ROUTES.home },
          { label: "Shop", to: ROUTES.shop },
          { label: search ? `"${search}"` : catLabel || "All artwork" },
        ]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,260px)_1fr] gap-10 mt-5">
        <aside className="hidden lg:block">
          <FilterSidebar filters={filters} onToggle={toggleFilter} onClear={clearFilters} resultCount={resultCount} activeCount={activeFilterCount} />
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
                <SlidersHorizontal size={14} /> Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
              <div className="text-[13px] text-ink-soft">{search ? `Results for "${search}"` : "Sorted results"}</div>
            </div>
            <div className="flex flex-wrap items-center gap-3 ml-0 sm:ml-auto">
              <div className="flex gap-1">
                <IconButton aria-label="Grid view" className={view === "grid" ? "bg-accent-soft" : ""} onClick={() => setView("grid")}>
                  <Grid2x2 size={15} />
                </IconButton>
                <IconButton aria-label="List view" className={view === "list" ? "bg-accent-soft" : ""} onClick={() => setView("list")}>
                  <List size={15} />
                </IconButton>
              </div>
              <Select aria-label="Sort by" className="w-full sm:w-[190px]" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                {SORT_OPTIONS.map((s) => (
                  <option key={s.key} value={s.key}>
                    {s.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          {!loading && pageItems.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No works match those filters"
              body="Try widening your price range or clearing a filter — or browse the full collection instead."
              action={
                <Button onClick={clearFilters}>Clear filters</Button>
              }
            />
          ) : (
            <>
              <ArtworkGrid artworks={pageItems} view={view} />
              <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[160] flex justify-end">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="animate-fade-up relative w-full max-w-[88vw] sm:max-w-[420px] h-full bg-surface-raised overflow-auto">
            <FilterSidebar
              filters={filters}
              onToggle={toggleFilter}
              onClear={clearFilters}
              resultCount={resultCount}
              activeCount={activeFilterCount}
              mobile
              onCloseMobile={() => setMobileFiltersOpen(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
