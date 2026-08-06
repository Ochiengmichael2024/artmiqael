import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cx } from "@/utils/cx";

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center items-center gap-1.5 mt-11">
      <IconButton aria-label="Previous page" disabled={page === 1} onClick={() => onChange(Math.max(1, page - 1))}>
        <ChevronLeft size={15} />
      </IconButton>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={cx(
            "font-mono w-[34px] h-[34px] rounded-full border border-line text-[12.5px]",
            page === i + 1 ? "bg-black text-white" : "bg-transparent text-ink"
          )}
        >
          {i + 1}
        </button>
      ))}
      <IconButton aria-label="Next page" disabled={page === totalPages} onClick={() => onChange(Math.min(totalPages, page + 1))}>
        <ChevronRight size={15} />
      </IconButton>
    </div>
  );
}
