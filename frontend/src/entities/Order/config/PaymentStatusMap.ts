import { PaymentStatus } from '../consts'

export const PaymentStatusMap: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: 'Ожидает оплаты',
  [PaymentStatus.SUCCEEDED]: 'Оплачено',
  [PaymentStatus.CANCELLED]: 'Отменено',
}