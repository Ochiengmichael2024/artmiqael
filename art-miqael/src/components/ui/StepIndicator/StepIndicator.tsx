import React, { Fragment } from "react";
import { Check } from "lucide-react";

export interface StepIndicatorProps {
  steps: string[];
  active: number;
}

export function StepIndicator({ steps, active }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((step, i) => (
        <Fragment key={step}>
          <div className="flex items-center gap-2">
            <div
              className={`font-mono w-[26px] h-[26px] rounded-full flex items-center justify-center text-[11.5px] border ${
                i <= active ? "bg-black text-white border-black" : "bg-surface-raised text-ink-faint border-line"
              }`}
            >
              {i < active ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-sm font-semibold ${i <= active ? "text-ink" : "text-ink-faint"}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className="flex-1 h-px bg-line" />}
        </Fragment>
      ))}
    </div>
  );
}
