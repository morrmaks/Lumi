import { PaymentMethods } from '@/features/Order'

export const PaymentMethodsMap: Record<PaymentMethods, string> = {
  [PaymentMethods.CARD]: 'Банковская карта',
  [PaymentMethods.CASH]: 'При получении',
}