import { IBasketItem } from '@/features/Basket/BasketProducts/ui/BasketProducts'

export const totalBasketProducts = (products: IBasketItem[]) => {
  return products.reduce((acc, product) => {
    return acc + product.quantity
  }, 0)
}
