import React, { type ReactNode } from "react";

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}

export function SectionHeader({ eyebrow, title, sub, action }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-end flex-wrap gap-4 mb-7">
      <div>
        {eyebrow && <div className="eyebrow mb-2.5">{eyebrow}</div>}
        <h2 className="heading-serif text-[clamp(28px,4vw,42px)]">{title}</h2>
        {sub && <p className="text-ink-soft mt-2.5 max-w-[520px] text-[15px] leading-relaxed">{sub}</p>}
      </div>
      {action}
    </div>
  );
}
