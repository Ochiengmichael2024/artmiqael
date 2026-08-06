import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import type { Order } from "@/types";

export function useOrders() {
  const { orders } = useAuth();

  const getById = useMemo(() => {
    const byId = new Map<string, Order>(orders.map((o) => [o.id, o]));
    return (id: string) => byId.get(id);
  }, [orders]);

  return { orders, getById };
}
