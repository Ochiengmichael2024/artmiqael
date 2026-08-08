import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { StepIndicator } from "@/components/ui/StepIndicator";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ROUTES } from "@/constants/routes";
import { formatPrice, formatDate } from "@/utils/format";
import { useOrders } from "@/hooks/useOrders";
import type { OrderStatus } from "@/types";

const STAGES: OrderStatus[] = ["Placed", "Processing", "Shipped", "Delivered"];

export function OrderDetailPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { getById } = useOrders();
  const order = getById(id);

  if (!order) {
    return (
      <Container className="pt-10">
        <EmptyState
          icon={Package}
          title="Order not found"
          body="This order may not exist."
          action={<Button onClick={() => navigate(ROUTES.account)}>Back to orders</Button>}
        />
      </Container>
    );
  }

  const stageIdx = STAGES.indexOf(order.status);

  return (
    <Container className="pt-7 pb-16 max-w-[800px]">
      <Breadcrumbs items={[{ label: "Home", to: ROUTES.home }, { label: "Orders", to: ROUTES.account }, { label: "#" + order.id }]} />
      <h1 className="heading-serif text-[30px] mt-4.5 mb-1.5">Order #{order.id}</h1>
      <p className="text-[13.5px] text-ink-soft mb-6.5">Placed on {formatDate(order.date)}</p>

      <Card raised className="p-6 mb-6">
        <StepIndicator steps={STAGES} active={stageIdx} />
        <div className="grid gap-3.5">
          {order.items.map((c) => (
            <div key={c.id} className="flex gap-3.5 items-center">
              <img src={c.artwork.img} alt="" className="w-[50px] h-[60px] rounded-lg object-cover shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{c.artwork.title}</div>
                <div className="text-xs text-ink-soft">Qty {c.qty}</div>
              </div>
              <div className="text-sm font-semibold">{formatPrice(c.artwork.price * c.qty)}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card className="p-5">
          <div className="font-mono text-[10.5px] text-ink-faint mb-2">SHIPPING TO</div>
          <p className="text-[13.5px]">
            {order.shipping.firstName} {order.shipping.lastName}
            <br />
            {order.shipping.address}
            <br />
            {order.shipping.city}, {order.shipping.country} {order.shipping.zip}
          </p>
        </Card>
        <Card className="p-5">
          <div className="font-mono text-[10.5px] text-ink-faint mb-2">TOTAL PAID</div>
          <p className="font-serif text-[22px] font-semibold">{formatPrice(order.total)}</p>
          <p className="text-[12.5px] text-ink-soft">{order.delivery.label} delivery</p>
        </Card>
      </div>
    </Container>
  );
}
