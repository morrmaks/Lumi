import { IBasketItem, IBasketProduct } from '@/features/Basket'

export const fullBasketPrices = (
  basket: IBasketItem[],
  products: IBasketProduct[]
) => {
  const discountPrice = basket.reduce((acc, item) => {
    const product = products.find((prod) => prod.id === item.productId)
    if (!product) return acc
    return acc + product.discountPrice * item.quantity
  }, 0)

  const price = basket.reduce((acc, item) => {
    const product = products.find((prod) => prod.id === item.productId)
    if (!product) return acc
    return acc + product.price * item.quantity
  }, 0)

  return { discountPrice, price }
}
