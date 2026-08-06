import React from "react";
import { cx } from "@/utils/cx";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
}

export function Card({ raised, className, children, ...rest }: CardProps) {
  return (
    <div className={cx(raised ? "card-raised" : "card", className)} {...rest}>
      {children}
    </div>
  );
}
