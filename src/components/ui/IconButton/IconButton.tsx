import React, { forwardRef } from "react";
import { cx } from "@/utils/cx";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ active, className, children, ...rest }, ref) => (
    <button ref={ref} className={cx("icon-btn", active && "is-active", className)} {...rest}>
      {children}
    </button>
  )
);
IconButton.displayName = "IconButton";
