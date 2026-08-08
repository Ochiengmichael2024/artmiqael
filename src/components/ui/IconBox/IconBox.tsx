import React, { type ReactNode } from "react";
import { cx } from "@/utils/cx";

export interface IconBoxProps {
  icon: ReactNode;
  size?: number;
  tone?: "default" | "sage" | "accent" | "danger";
  className?: string;
}

const TONE_CLASS: Record<NonNullable<IconBoxProps["tone"]>, string> = {
  default: "bg-surface-raised border border-line text-ink-soft",
  sage: "bg-sage-soft text-sage",
  accent: "bg-accent-soft text-accent",
  danger: "bg-danger-soft text-danger",
};

export function IconBox({ icon, size = 44, tone = "default", className }: IconBoxProps) {
  return (
    <div
      className={cx("rounded-full flex items-center justify-center shrink-0", TONE_CLASS[tone], className)}
      style={{ width: size, height: size }}
    >
      {icon}
    </div>
  );
}
