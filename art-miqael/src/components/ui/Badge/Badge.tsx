import React from "react";
import { cx } from "@/utils/cx";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "default" | "accent" | "sage";
}

export function Badge({ tone = "default", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx("badge", tone === "accent" && "badge-accent", tone === "sage" && "badge-sage", className)} {...rest}>
      {children}
    </span>
  );
}
