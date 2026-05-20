import type { OrderInput } from "@/lib/order-validation";

export type OrderRecord = OrderInput & {
  orderId: string;
  dateTime: string;
  paymentMethod: "Cash On Delivery";
  orderStatus: "New Order";
  notes: string;
};

export function createOrderRecord(input: OrderInput): OrderRecord {
  const dateTime = new Intl.DateTimeFormat("en-NP", {
    dateStyle: "medium",
    timeStyle: "medium",
    timeZone: "Asia/Kathmandu"
  }).format(new Date());

  return {
    ...input,
    orderId: `SN-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    dateTime,
    paymentMethod: "Cash On Delivery",
    orderStatus: "New Order",
    notes: ""
  };
}
