import { IWishlistProduct } from '@/features/Wishlist'

export const fullSelectDiscountPrice = (
  products: IWishlistProduct[],
  select: string[]
): number => {
  return products.reduce((acc, prod) => {
    if (select.includes(prod.id)) {
      return acc + prod.discountPrice
    }
    return acc
  }, 0)
}
