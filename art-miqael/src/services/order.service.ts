import type { Order, OrderLineItem, DeliveryOption, ShippingDetails } from "@/types";
import { storageService } from "@/services/storage.service";
import { generateOrderId } from "@/utils/slugify";

const KEY = "orders";

export interface PlaceOrderInput {
  items: OrderLineItem[];
  shipping: ShippingDetails;
  delivery: DeliveryOption;
  subtotal: number;
  discount: number;
  total: number;
}

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const orderService = {
  loadAll(): Order[] {
    return storageService.get<Order[]>(KEY, []);
  },
  async place(input: PlaceOrderInput): Promise<Order> {
    const order: Order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      status: "Processing",
      ...input,
    };
    const existing = storageService.get<Order[]>(KEY, []);
    storageService.set(KEY, [...existing, order]);
    return delay(order);
  },
  async getById(id: string): Promise<Order | undefined> {
    const existing = storageService.get<Order[]>(KEY, []);
    return delay(existing.find((o) => o.id === id));
  },
};
