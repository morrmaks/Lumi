import { IWishlistItem } from '@/features/Wishlist/WishlistProducts/ui/WishlistProducts'

export const fullSelectDiscountPrice = (
  products: IWishlistItem[],
  select: string[]
): number => {
  return products.reduce((acc, prod) => {
    if (select.includes(prod.id)) {
      return acc + prod.discountPrice
    }
    return acc
  }, 0)
}
