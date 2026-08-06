import React from "react";
import { cx } from "@/utils/cx";

export function SummaryRow({ label, value, big }: { label: string; value: string; big?: boolean }) {
  return (
    <div className={cx("flex justify-between mb-2.5", big ? "text-[17px] font-bold" : "text-[13.5px] font-medium")}>
      <span className={big ? "text-ink" : "text-ink-soft"}>{label}</span>
      <span className={big ? "font-serif" : ""}>{value}</span>
    </div>
  );
}
