import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/constants/routes";
import { formatPrice } from "@/utils/format";
import { useOrders } from "@/hooks/useOrders";

export function OrderSuccessPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { getById } = useOrders();
  const order = getById(id);

  return (
    <Container className="pt-16 pb-16 text-center">
      <IconBox icon={<Check size={28} />} tone="sage" size={64} className="mx-auto mb-5.5" />
      <div className="eyebrow mb-2.5">ORDER CONFIRMED</div>
      <h1 className="heading-serif text-[34px] mb-3">Thank you.</h1>
      <p className="text-ink-soft max-w-[460px] mx-auto mb-2 text-[14.5px]">
        Your order {order ? <strong className="font-mono">#{order.id}</strong> : ""} has been placed. A confirmation has been simulated to your email.
      </p>
      {order && <p className="text-ink-faint text-[13px] mb-7">Total paid: {formatPrice(order.total)}</p>}
      <div className="flex gap-3 justify-center mt-5">
        <Button onClick={() => navigate(ROUTES.account)}>Track my order</Button>
        <Button variant="secondary" onClick={() => navigate(ROUTES.shop)}>
          Continue shopping
        </Button>
      </div>
    </Container>
  );
}
