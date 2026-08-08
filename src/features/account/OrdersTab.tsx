import React from "react";
import { useNavigate } from "react-router-dom";
import { Package } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/constants/routes";
import { formatPrice, formatDate } from "@/utils/format";
import { useOrders } from "@/hooks/useOrders";

export function OrdersTab() {
  const navigate = useNavigate();
  const { orders } = useOrders();

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="No orders yet"
        body="Your order history will appear here after checkout."
        action={<Button onClick={() => navigate(ROUTES.shop)}>Browse art</Button>}
      />
    );
  }

  return (
    <div className="grid gap-3.5">
      {orders
        .slice()
        .reverse()
        .map((o) => (
          <button
            key={o.id}
            onClick={() => navigate(ROUTES.orderDetail(o.id))}
            className="card p-4.5 flex justify-between items-center text-left cursor-pointer border border-line"
          >
            <div>
              <div className="font-mono text-[11.5px] text-ink-faint">ORDER #{o.id}</div>
              <div className="text-sm font-semibold my-1">
                {o.items.length} item{o.items.length > 1 ? "s" : ""} · {formatPrice(o.total)}
              </div>
              <div className="text-[12.5px] text-ink-soft">{formatDate(o.date)}</div>
            </div>
            <Badge tone="sage">{o.status}</Badge>
          </button>
        ))}
    </div>
  );
}
