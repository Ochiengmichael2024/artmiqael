import React, { forwardRef } from "react";
import { cx } from "@/utils/cx";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({ label, className, id, children, ...rest }, ref) => {
  const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      {label && (
        <label className="field-label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <select ref={ref} id={selectId} className={cx("field-input", className)} {...rest}>
        {children}
      </select>
    </div>
  );
});
Select.displayName = "Select";
