import React from "react";
import { cx } from "@/utils/cx";

export function Container({ className, children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx("container-page", className)} {...rest}>
      {children}
    </div>
  );
}
