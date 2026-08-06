import React from "react";
import type { OrderLineItem, ShippingDetails, DeliveryOption } from "@/types";
import type { BillingDetails } from "./useCheckout";
import { formatPrice } from "@/utils/format";

export interface ReviewStepProps {
  items: OrderLineItem[];
  shipping: ShippingDetails;
  billing: BillingDetails;
  delivery: DeliveryOption;
}

export function ReviewStep({ items, shipping, billing, delivery }: ReviewStepProps) {
  return (
    <div className="grid gap-5">
      <div className="heading-serif text-xl">Review your order</div>
      {items.map((c) => (
        <div key={c.id} className="flex gap-3.5 items-center">
          <img src={c.artwork.img} alt="" className="w-[54px] h-16 rounded-lg object-cover shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold">{c.artwork.title}</div>
            <div className="text-xs text-ink-soft">Qty {c.qty}</div>
          </div>
          <div className="text-sm font-semibold">{formatPrice(c.artwork.price * c.qty)}</div>
        </div>
      ))}
      <hr className="border-line" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[13.5px]">
        <div>
          <div className="font-mono text-[10.5px] text-ink-faint mb-1.5">SHIP TO</div>
          <div>
            {shipping.firstName} {shipping.lastName}
          </div>
          <div className="text-ink-soft">
            {shipping.address}, {shipping.city}, {shipping.country} {shipping.zip}
          </div>
        </div>
        <div>
          <div className="font-mono text-[10.5px] text-ink-faint mb-1.5">PAYMENT</div>
          <div>Card ending {billing.card.replace(/\s/g, "").slice(-4) || "0000"}</div>
          <div className="text-ink-soft">{delivery.label} delivery</div>
        </div>
      </div>
    </div>
  );
}
