import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { SummaryRow } from "@/components/common/SummaryRow";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/format";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useCheckout } from "./useCheckout";
import { ShippingStep } from "./ShippingStep";
import { PaymentStep } from "./PaymentStep";
import { ReviewStep } from "./ReviewStep";

const STEPS = ["Shipping", "Payment", "Review"];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const { placeOrder } = useAuth();
  const [placing, setPlacing] = useState(false);
  const {
    items, subtotal, discount, total, step, next, back,
    shipping, setShipping, delivery, setDelivery, deliveryOptions, shippingCost,
    billing, setBilling, errors,
  } = useCheckout();

  if (items.length === 0) {
    return (
      <Container className="pt-10">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          body="Add something to your cart before checking out."
          action={<Button onClick={() => navigate(ROUTES.shop)}>Browse art</Button>}
        />
      </Container>
    );
  }

  const activeDelivery = deliveryOptions.find((d) => d.key === delivery)!;

  async function handlePlaceOrder() {
    setPlacing(true);
    const order = await placeOrder({ items, shipping, delivery: activeDelivery, subtotal, discount, total });
    clearCart();
    setPlacing(false);
    navigate(ROUTES.orderSuccess(order.id));
  }

  return (
    <Container className="pt-7 pb-16 max-w-[1100px]">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Cart", to: ROUTES.cart }, { label: "Checkout" }]} />
      <PageHeader title="Checkout" />
      <StepIndicator steps={STEPS} active={step} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">
        <Card raised className="p-7">
          {step === 0 && (
            <ShippingStep shipping={shipping} onChange={setShipping} errors={errors} delivery={delivery} onDeliveryChange={setDelivery} deliveryOptions={deliveryOptions} />
          )}
          {step === 1 && <PaymentStep billing={billing} onChange={setBilling} errors={errors} />}
          {step === 2 && <ReviewStep items={items} shipping={shipping} billing={billing} delivery={activeDelivery} />}

          <div className="flex justify-between mt-7">
            {step > 0 ? (
              <Button variant="secondary" onClick={back}>
                <ArrowLeft size={14} /> Back
              </Button>
            ) : (
              <span />
            )}
            {step < 2 ? (
              <Button onClick={next}>
                Continue <ArrowRight size={14} />
              </Button>
            ) : (
              <Button onClick={handlePlaceOrder} disabled={placing}>
                {placing ? <LoadingSpinner label="Placing order…" /> : <>Place order <Check size={14} /></>}
              </Button>
            )}
          </div>
        </Card>

        <Card raised className="p-5.5 sticky top-24 self-start">
          <div className="heading-serif text-lg mb-3.5">Order summary</div>
          <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
          {discount > 0 && <SummaryRow label="Discount" value={"−" + formatPrice(discount)} />}
          <SummaryRow label="Shipping" value={shippingCost === 0 ? "Free" : formatPrice(shippingCost)} />
          <hr className="border-line my-3" />
          <SummaryRow label="Total" value={formatPrice(total)} big />
        </Card>
      </div>
    </Container>
  );
}
