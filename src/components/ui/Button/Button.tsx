import React, { forwardRef } from "react";
import { cx } from "@/utils/cx";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "md" | "sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
  danger: "btn-danger",
};

/** The single button implementation used everywhere in the app — never restyle a raw <button> for these variants. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", block, className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={cx(VARIANT_CLASS[variant], size === "sm" && "btn-sm", block && "btn-block", className)}
      {...rest}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
