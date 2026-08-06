import React, { type ReactNode } from "react";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";

/** Single place that composes every context provider — add new global state here, not in main.tsx. */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <UIProvider>{children}</UIProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
