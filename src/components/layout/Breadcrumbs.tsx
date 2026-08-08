import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="font-mono text-[11.5px] text-ink-faint flex items-center gap-1.5 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={11} />}
          {item.to ? (
            <Link to={item.to} className={i === items.length - 1 ? "text-accent" : "text-ink-faint hover:text-ink"}>
              {item.label}
            </Link>
          ) : (
            <span className="text-accent">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
