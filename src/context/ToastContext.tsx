import React, { createContext, useCallback, useState, type ReactNode } from "react";
import type { ToastMessage, ToastType } from "@/types";
import { generateId } from "@/utils/slugify";

interface ToastContextValue {
  toasts: ToastMessage[];
  pushToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const AUTO_DISMISS_MS = 3200;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const pushToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = generateId();
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
    },
    [dismissToast]
  );

  return <ToastContext.Provider value={{ toasts, pushToast, dismissToast }}>{children}</ToastContext.Provider>;
}
