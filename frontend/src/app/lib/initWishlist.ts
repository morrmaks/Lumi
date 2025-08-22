import { LocalStorage } from '@/shared/consts'
import { wishlistProductsActions } from '@/features/Wishlist'
import { useAppDispatch } from '@/shared/lib/hooks'

export const initWishlist = async (
  isAuth: boolean,
  wishlistProductIds: string[] | undefined,
  addToWishlist: (productIds: string[]) => { unwrap: () => Promise<string[]> },
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  if (!isAuth) {
    const localWishlist = localStorage.getItem(LocalStorage.WISHLIST)
    dispatch(
      wishlistProductsActions.addProduct(
        localWishlist ? JSON.parse(localWishlist) : []
      )
    )
    return
  }

  const localWishlist = localStorage.getItem(LocalStorage.WISHLIST)
  const localWishlistIds: string[] = localWishlist
    ? JSON.parse(localWishlist)
    : []
  localStorage.removeItem(LocalStorage.WISHLIST)

  if (wishlistProductIds) {
    if (localWishlistIds.length > 0) {
      const productsToAdd = localWishlistIds.filter(
        (id) => !wishlistProductIds.includes(id)
      )
      const added = await addToWishlist(productsToAdd).unwrap()
      if (added) dispatch(wishlistProductsActions.addProduct(added))
    }

    dispatch(wishlistProductsActions.addProduct(wishlistProductIds))
  } else {
    const added = await addToWishlist(localWishlistIds).unwrap()
    if (added) dispatch(wishlistProductsActions.addProduct(added))
  }
}
