import React, { useState, type ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface TabItem {
  key: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultKey?: string;
}

export function Tabs({ items, defaultKey }: TabsProps) {
  const [active, setActive] = useState(defaultKey ?? items[0]?.key);
  const activeItem = items.find((i) => i.key === active);

  return (
    <div>
      <div className="flex gap-6 border-b border-line" role="tablist">
        {items.map((item) => (
          <button
            key={item.key}
            role="tab"
            aria-selected={active === item.key}
            onClick={() => setActive(item.key)}
            className={cx(
              "bg-transparent px-1 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors",
              active === item.key ? "text-ink border-ink" : "text-ink-faint border-transparent"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="py-6 max-w-2xl" role="tabpanel">
        {activeItem?.content}
      </div>
    </div>
  );
}
