export const OrderStatus = {
  PENDING: "pending",
  PAID: "paid",
  SHIPPED: "shipped",
  CANCELLED: "cancelled",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const PaymentMethods = {
  CASH: "cash",
  CARD: "card",
} as const;

export type PaymentMethods =
  (typeof PaymentMethods)[keyof typeof PaymentMethods];
