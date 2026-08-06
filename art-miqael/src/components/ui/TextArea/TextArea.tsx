import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";
import { cx } from "@/utils/cx";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({ label, error, className, id, rows = 4, ...rest }, ref) => {
  const areaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
  return (
    <div>
      {label && (
        <label className="field-label" htmlFor={areaId}>
          {label}
        </label>
      )}
      <textarea ref={ref} id={areaId} rows={rows} className={cx("field-input", error && "has-error", className)} {...rest} />
      {error && (
        <div className="field-error">
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </div>
  );
});
TextArea.displayName = "TextArea";
