import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";
import { cx } from "@/utils/cx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, id, ...rest }, ref) => {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      {label && (
        <label className="field-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input ref={ref} id={inputId} className={cx("field-input", error && "has-error", className)} {...rest} />
      {error && (
        <div className="field-error">
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";
