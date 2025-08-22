export const PaymentMethods = {
  CARD: 'card',
  CASH: 'cash',
} as const

export type PaymentMethods =
  (typeof PaymentMethods)[keyof typeof PaymentMethods]

export type PaymentMethodsKey = keyof typeof PaymentMethods
