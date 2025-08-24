export const PaymentStatus = {
  PENDING: 'pending',
  SUCCEEDED: 'succeeded',
  CANCELLED: 'cancelled',
} as const;

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
