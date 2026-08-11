import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cx } from "@/utils/cx";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy?: string;
  maxWidth?: number;
  className?: string;
}

export function Modal({ open, onClose, children, labelledBy, maxWidth = 440, className }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={labelledBy}
      className="fixed inset-0 z-[150] flex items-center justify-center bg-ink/55 p-5"
      onClick={onClose}
    >
      <div
        className={cx("card-raised relative w-full max-h-[calc(100vh-2rem)] overflow-auto", className)}
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton aria-label="Close" className="absolute top-4 right-4" onClick={onClose}>
          <X size={16} />
        </IconButton>
        {children}
      </div>
    </div>,
    document.body
  );
}
