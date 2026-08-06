import React, { type ReactNode } from "react";

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, sub, children }: PageHeaderProps) {
  return (
    <div className="mt-4 mb-6">
      {eyebrow && <div className="eyebrow mb-2.5">{eyebrow}</div>}
      <h1 className="heading-serif text-[clamp(28px,5vw,44px)]">{title}</h1>
      {sub && <p className="text-ink-soft mt-2.5 max-w-xl text-[15px] leading-relaxed">{sub}</p>}
      {children}
    </div>
  );
}
