import React from "react";
import { ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { SummaryRow } from "@/components/common/SummaryRow";
import { formatPrice } from "@/utils/format";

export interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponInput: string;
  onCouponInputChange: (value: string) => void;
  onApplyCoupon: () => void;
  couponError?: string;
  couponApplied?: string | null;
  onCheckout: () => void;
}

export function OrderSummary({
  subtotal,
  discount,
  shipping,
  total,
  couponInput,
  onCouponInputChange,
  onApplyCoupon,
  couponError,
  couponApplied,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <Card raised className="p-6 sticky top-24">
      <div className="heading-serif text-xl mb-4.5">Order summary</div>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Coupon code (try ART10)" value={couponInput} onChange={(e) => onCouponInputChange(e.target.value)} />
        <Button variant="secondary" onClick={onApplyCoupon}>
          Apply
        </Button>
      </div>
      {couponError && <div className="field-error mb-3">{couponError}</div>}
      {couponApplied && <div className="mb-3 text-[12.5px] text-sage">{couponApplied} applied</div>}
      <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
      {discount > 0 && <SummaryRow label="Discount" value={"−" + formatPrice(discount)} />}
      <SummaryRow label="Estimated shipping" value={shipping === 0 ? "Free" : formatPrice(shipping)} />
      <hr className="border-line my-3.5" />
      <SummaryRow label="Total" value={formatPrice(total)} big />
      <Button block className="mt-4.5" onClick={onCheckout}>
        Proceed to checkout
      </Button>
      <div className="flex items-center gap-1.5 justify-center mt-3.5 text-[11.5px] text-ink-faint">
        <ShieldCheck size={13} /> Secure, simulated checkout
      </div>
    </Card>
  );
}
