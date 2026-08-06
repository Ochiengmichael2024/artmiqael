import React from "react";
import type { ShippingDetails, DeliveryOption } from "@/types";
import { Input } from "@/components/ui/Input";
import { formatPrice } from "@/utils/format";
import { cx } from "@/utils/cx";

export interface ShippingStepProps {
  shipping: ShippingDetails;
  onChange: (shipping: ShippingDetails) => void;
  errors: Record<string, string>;
  delivery: string;
  onDeliveryChange: (key: string) => void;
  deliveryOptions: DeliveryOption[];
}

export function ShippingStep({ shipping, onChange, errors, delivery, onDeliveryChange, deliveryOptions }: ShippingStepProps) {
  const set = (patch: Partial<ShippingDetails>) => onChange({ ...shipping, ...patch });

  return (
    <div className="grid gap-4">
      <div className="heading-serif text-xl mb-1">Shipping information</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Input label="First name" value={shipping.firstName} error={errors.firstName} onChange={(e) => set({ firstName: e.target.value })} />
        <Input label="Last name" value={shipping.lastName} error={errors.lastName} onChange={(e) => set({ lastName: e.target.value })} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Input label="Email" type="email" value={shipping.email} error={errors.email} onChange={(e) => set({ email: e.target.value })} />
        <Input label="Phone" value={shipping.phone} onChange={(e) => set({ phone: e.target.value })} />
      </div>
      <Input label="Street address" value={shipping.address} error={errors.address} onChange={(e) => set({ address: e.target.value })} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <Input label="City" value={shipping.city} error={errors.city} onChange={(e) => set({ city: e.target.value })} />
        <Input label="Country" value={shipping.country} error={errors.country} onChange={(e) => set({ country: e.target.value })} />
        <Input label="ZIP / Postal code" value={shipping.zip} error={errors.zip} onChange={(e) => set({ zip: e.target.value })} />
      </div>

      <div className="mt-2.5">
        <div className="heading-serif text-lg mb-3">Delivery options</div>
        <div className="grid gap-2.5">
          {deliveryOptions.map((d) => (
            <label
              key={d.key}
              className={cx("flex items-center gap-3 border rounded-xl p-3.5 cursor-pointer", delivery === d.key ? "border-ink" : "border-line")}
            >
              <input type="radio" name="delivery" className="checkbox" checked={delivery === d.key} onChange={() => onDeliveryChange(d.key)} />
              <div className="flex-1">
                <div className="font-semibold text-sm">{d.label}</div>
                <div className="text-[12.5px] text-ink-soft">{d.days}</div>
              </div>
              <div className="font-semibold text-sm">{d.price === 0 ? "Free" : formatPrice(d.price)}</div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
