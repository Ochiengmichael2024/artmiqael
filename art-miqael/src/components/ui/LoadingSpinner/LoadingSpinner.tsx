import React from "react";
import { Loader2 } from "lucide-react";
import { cx } from "@/utils/cx";

export interface LoadingSpinnerProps {
  size?: number;
  label?: string;
  className?: string;
}

export function LoadingSpinner({ size = 18, label, className }: LoadingSpinnerProps) {
  return (
    <span className={cx("inline-flex items-center gap-2 text-ink-soft text-sm", className)}>
      <Loader2 size={size} className="animate-spin" />
      {label}
    </span>
  );
}
