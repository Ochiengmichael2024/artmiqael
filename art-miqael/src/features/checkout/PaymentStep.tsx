import React from "react";
import { Lock } from "lucide-react";
import type { BillingDetails } from "./useCheckout";
import { Input } from "@/components/ui/Input";

export interface PaymentStepProps {
  billing: BillingDetails;
  onChange: (billing: BillingDetails) => void;
  errors: Record<string, string>;
}

export function PaymentStep({ billing, onChange, errors }: PaymentStepProps) {
  const set = (patch: Partial<BillingDetails>) => onChange({ ...billing, ...patch });

  return (
    <div className="grid gap-4">
      <div className="heading-serif text-xl mb-1">Payment</div>
      <div className="flex items-center gap-2 text-xs text-ink-soft bg-surface px-3.5 py-2.5 rounded-[10px]">
        <Lock size={13} /> Demo checkout — enter any test values, no real charge is made.
      </div>
      <Input label="Name on card" value={billing.nameOnCard} error={errors.nameOnCard} onChange={(e) => set({ nameOnCard: e.target.value })} />
      <Input label="Card number" placeholder="4242 4242 4242 4242" value={billing.card} error={errors.card} onChange={(e) => set({ card: e.target.value })} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Input label="Expiry (MM/YY)" placeholder="09/28" value={billing.exp} error={errors.exp} onChange={(e) => set({ exp: e.target.value })} />
        <Input label="CVC" placeholder="123" value={billing.cvc} error={errors.cvc} onChange={(e) => set({ cvc: e.target.value })} />
      </div>
    </div>
  );
}
