import { IBasketItem } from '@/features/Basket/BasketProducts/ui/BasketProducts'

export const fullBasketPrices = (products: IBasketItem[]) => {
  const discountPrice = products.reduce((acc, product) => {
    return acc + product.discountPrice * product.quantity
  }, 0)

  const price = products.reduce((acc, product) => {
    return acc + product.price * product.quantity
  }, 0)

  return { discountPrice, price }
}
