import { OrderStatus, PaymentStatus } from '@/entities/Order'
import { PaymentMethods } from '../../consts'

export interface IOrderProduct {
  productId: string
  quantity: number
}

export interface IOrderProductFull {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  categorySlug: string
}

export interface IOrder {
  id: string
  orderNumber: string
  total: number
  status: OrderStatus
  date: string
  products: IOrderProduct[]
  trackNumber: string
  address: string
  paymentMethod: PaymentMethods
  paymentStatus: PaymentStatus
}

export interface OrderSchema {
  isFromOrderLink: boolean
  products: IOrderProduct[]
}
