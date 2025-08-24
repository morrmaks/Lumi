import { OrderStatus } from '../consts'

export const OrderStatusMap: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: 'В ожидании',
  [OrderStatus.PAID]: 'Оплачен',
  [OrderStatus.SHIPPED]: 'Отправлен',
  [OrderStatus.CANCELLED]: 'Отменен',
}