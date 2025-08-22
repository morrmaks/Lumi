import { IBasketItem } from '@/features/Basket'

export const totalBasketProducts = (products: IBasketItem[]) => {
  return products.reduce((acc, product) => {
    return acc + product.quantity
  }, 0)
}
