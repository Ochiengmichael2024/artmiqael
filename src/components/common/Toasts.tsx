import React from "react";
import { Check, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/useToast";
import { IconBox } from "@/components/ui/IconBox";
import { Card } from "@/components/ui/Card";

export function Toasts() {
  const { toasts, dismissToast } = useToast();
  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2.5 max-w-[340px]">
      {toasts.map((t) => (
        <Card raised key={t.id} className="animate-fade-up px-4 py-3.5 flex items-start gap-2.5">
          <IconBox
            size={22}
            tone={t.type === "error" ? "danger" : "sage"}
            icon={t.type === "error" ? <AlertCircle size={13} /> : <Check size={13} />}
            className="mt-0.5"
          />
          <div className="text-[13.5px] leading-snug flex-1">{t.message}</div>
          <button
            className="icon-btn w-6 h-6 border-0 bg-transparent shrink-0"
            onClick={() => dismissToast(t.id)}
            aria-label="Dismiss"
          >
            <X size={13} />
          </button>
        </Card>
      ))}
    </div>
  );
}
