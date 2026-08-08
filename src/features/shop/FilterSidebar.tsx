import React from "react";
import { X } from "lucide-react";
import type { ShopFilters } from "@/types";
import { CATEGORIES } from "@/data/categories.data";
import { STYLES, ORIENTATIONS, SIZES, PRICE_BANDS } from "@/constants/filters";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";

export interface FilterSidebarProps {
  filters: ShopFilters;
  onToggle: (key: keyof ShopFilters, value: string) => void;
  onClear: () => void;
  resultCount: number;
  activeCount: number;
  mobile?: boolean;
  onCloseMobile?: () => void;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="py-4.5 border-b border-line">
      <div className="font-mono text-[11.5px] text-ink-soft mb-2.5 tracking-wide">{title.toUpperCase()}</div>
      {children}
    </div>
  );
}

export function FilterSidebar({ filters, onToggle, onClear, resultCount, activeCount, mobile, onCloseMobile }: FilterSidebarProps) {
  return (
    <div className={mobile ? "p-5" : ""}>
      {mobile && (
        <div className="flex justify-between items-center mb-2.5">
          <span className="font-serif text-xl">Filters</span>
          <IconButton aria-label="Close filters" onClick={onCloseMobile}>
            <X size={16} />
          </IconButton>
        </div>
      )}
      <div className="flex justify-between items-center pb-2.5">
        <div className="heading-serif text-2xl">Artworks</div>
        {activeCount > 0 && (
          <button className="underline-link" onClick={onClear}>
            Clear ({activeCount})
          </button>
        )}
      </div>
      <div className="font-mono text-[11px] text-ink-faint">{resultCount} WORKS FOUND</div>
      <hr className="border-line my-4" />

      <FilterSection title="Category">
        {CATEGORIES.map((c) => (
          <label key={c.slug} className="checkbox-row">
            <input type="checkbox" className="checkbox" checked={filters.category.includes(c.slug)} onChange={() => onToggle("category", c.slug)} />
            {c.label}
          </label>
        ))}
      </FilterSection>
      <FilterSection title="Style">
        {STYLES.map((s) => (
          <label key={s} className="checkbox-row">
            <input type="checkbox" className="checkbox" checked={filters.style.includes(s)} onChange={() => onToggle("style", s)} />
            {s}
          </label>
        ))}
      </FilterSection>
      <FilterSection title="Orientation">
        {ORIENTATIONS.map((o) => (
          <label key={o} className="checkbox-row">
            <input type="checkbox" className="checkbox" checked={filters.orientation.includes(o)} onChange={() => onToggle("orientation", o)} />
            {o}
          </label>
        ))}
      </FilterSection>
      <FilterSection title="Price">
        {PRICE_BANDS.map((p) => (
          <label key={p.key} className="checkbox-row">
            <input type="checkbox" className="checkbox" checked={filters.price.includes(p.key)} onChange={() => onToggle("price", p.key)} />
            {p.label}
          </label>
        ))}
      </FilterSection>
      <FilterSection title="Size">
        {SIZES.map((s) => (
          <label key={s.key} className="checkbox-row">
            <input type="checkbox" className="checkbox" checked={filters.size.includes(s.key)} onChange={() => onToggle("size", s.key)} />
            {s.label}
          </label>
        ))}
      </FilterSection>
      <FilterSection title="Availability">
        <label className="checkbox-row">
          <input type="checkbox" className="checkbox" checked={filters.availability.includes("ready")} onChange={() => onToggle("availability", "ready")} />
          Ready to ship
        </label>
        <label className="checkbox-row">
          <input type="checkbox" className="checkbox" checked={filters.availability.includes("made")} onChange={() => onToggle("availability", "made")} />
          Made to order
        </label>
      </FilterSection>
      <p className="text-xs text-ink-faint mt-3.5 leading-relaxed">✦ Every work is hand-checked by the Art Miqael team.</p>
      {mobile && (
        <Button block className="mt-5" onClick={onCloseMobile}>
          Show {resultCount} results
        </Button>
      )}
    </div>
  );
}
