import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { getWishlistProducts } from '@/features/Wishlist'

export const useCheckInWishlist = (id: string): boolean => {
  const wishlistProductIds = useAppSelector(getWishlistProducts)
  return wishlistProductIds.includes(id)
}
