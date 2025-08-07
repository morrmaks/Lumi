export interface OrderProduct {
  id: string
  quantity: number
}

export interface IOrder {
  id: string
  total: number
  status: string
  date: string
  products: OrderProduct[]
  trackNumber: string
  address: string
  paymentMethod: string
}
