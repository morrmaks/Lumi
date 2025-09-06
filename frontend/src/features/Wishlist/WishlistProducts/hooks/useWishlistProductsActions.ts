import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { getUserIsAuth } from '@/entities/User'
import {
  useDeleteWishlistProductMutation,
  useDeleteWishlistProductsMutation,
} from '@/features/Wishlist/api/wishlistApi'
import {
  basketProductsActions,
  IBasketItem,
  useAddBasketProductsMutation,
} from '@/features/Basket'
import { IWishlistProduct, wishlistProductsActions } from '@/features/Wishlist'

export const useWishlistProductsActions = (
  basketItems: IBasketItem[],
  products: IWishlistProduct[],
  select: string[],
  setSelect: Dispatch<SetStateAction<string[]>>
) => {
  const isAuth = useAppSelector(getUserIsAuth)
  const dispatch = useAppDispatch()

  const [deleteWishlistProduct, { isLoading: isLoadingDeleteWishlistProduct }] =
    useDeleteWishlistProductMutation()
  const [
    deleteWishlistProducts,
    { isLoading: isLoadingDeleteWishlistProducts },
  ] = useDeleteWishlistProductsMutation()
  const [addToBasketProducts, { isLoading: isLoadingAddToBasketProducts }] =
    useAddBasketProductsMutation()

  const selectAllCards = useCallback(
    (newStateChecked: boolean) => {
      if (newStateChecked) {
        setSelect(products.map((product) => product.id))
      } else {
        setSelect([])
      }
    },
    [products]
  )

  const selectCard = useCallback(
    (id: string, newStateChecked: boolean) => {
      if (newStateChecked) {
        setSelect((prev) => [...prev, id])
      } else {
        setSelect(select.filter((cardId) => cardId !== id))
      }
    },
    [select]
  )

  const removeCard = useCallback(
    async (id: string) => {
      if (isAuth) {
        const data = await deleteWishlistProduct(id)
        if (!data) return
      }
      dispatch(wishlistProductsActions.removeProduct(id))
      setSelect(select.filter((productId) => productId !== id))
    },
    [dispatch, isAuth, select, deleteWishlistProduct]
  )

  const removeSelectCard = useCallback(async () => {
    if (isAuth) {
      const data = await deleteWishlistProducts(select)
      if (!data) return
    }
    dispatch(wishlistProductsActions.removeProduct(select))
    setSelect([])
  }, [isAuth, dispatch, select, deleteWishlistProducts])

  const addSelectedToBasket = useCallback(async () => {
    if (isAuth) {
      const basketItemsToAdd = basketItems.filter((item) =>
        select.includes(item.productId)
      )
      const data = await addToBasketProducts(basketItemsToAdd)
      if (!data) return
    }
    dispatch(basketProductsActions.addManyProducts(select))
    setSelect([])
  }, [isAuth, dispatch, select, addToBasketProducts])

  return {
    selectAllCards,
    selectCard,
    removeCard,
    removeSelectCard,
    addSelectedToBasket,
    isLoadingDeleteWishlistProduct,
    isLoadingDeleteWishlistProducts,
    isLoadingAddToBasketProducts,
  }
}
