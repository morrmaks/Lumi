import {
  useAppDispatch,
  useAppSelector,
  useCheckInBasket,
  useCheckInConfigurator,
  useCheckInWishlist,
} from '@/shared/lib/hooks'
import { MouseEvent, useCallback } from 'react'
import { getUserIsAuth } from '@/entities/User'
import {
  useAddWishlistProductMutation,
  useDeleteWishlistProductMutation,
} from '@/features/Wishlist/api/wishlistApi'
import {
  basketProductsActions,
  useAddBasketProductMutation,
} from '@/features/Basket'
import { wishlistProductsActions } from '@/features/Wishlist'
import {
  ComponentTypes,
  configuratorComponentsActions,
} from '@/features/Configurator'
import {
  useAddConfigureComponentMutation,
  useDeleteConfigureComponentMutation,
} from '@/features/Configurator/api'

export const useCategoryProductActions = (
  id: string,
  componentType?: ComponentTypes
) => {
  const isAuth = useAppSelector(getUserIsAuth)
  const dispatch = useAppDispatch()

  const [addToWishlist, { isLoading: isLoadingAddToWishlist }] =
    useAddWishlistProductMutation()
  const [deleteFromWishlist, { isLoading: isLoadingDeleteFromWishlist }] =
    useDeleteWishlistProductMutation()
  const [addBasketProduct, { isLoading: isLoadingBasket }] =
    useAddBasketProductMutation()
  const [addToConfigurator, { isLoading: isLoadingAddToConfigurator }] =
    useAddConfigureComponentMutation()
  const [
    deleteFromConfigurator,
    { isLoading: isLoadingRemoveFromConfigurator },
  ] = useDeleteConfigureComponentMutation()

  const isLoadingWishlist =
    isLoadingAddToWishlist || isLoadingDeleteFromWishlist
  const isLoadingConfigurator =
    isLoadingAddToConfigurator || isLoadingRemoveFromConfigurator

  const isInBasket = useCheckInBasket(id)
  const isInWishlist = useCheckInWishlist(id)
  const isInConfigurator = useCheckInConfigurator(id)

  const addToBasket = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (isAuth) {
      addBasketProduct(id)
    }
    dispatch(basketProductsActions.addProduct(id))
  }, [])

  const toggleWishlist = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (isAuth) {
        if (isInWishlist) await deleteFromWishlist(id)
        else await addToWishlist(id)
      }
      dispatch(
        isInWishlist
          ? wishlistProductsActions.removeProduct(id)
          : wishlistProductsActions.addProduct(id)
      )
    },
    [dispatch, isAuth, id]
  )

  const toggleConfigurator = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (!componentType) return
      if (isAuth) {
        if (isInConfigurator) await deleteFromConfigurator(id)
        else addToConfigurator(id)
      }
      if (isInConfigurator) {
        dispatch(
          configuratorComponentsActions.removeComponent({
            componentType,
            componentId: id,
          })
        )
      } else {
        dispatch(
          configuratorComponentsActions.setComponent({
            componentType,
            componentId: id,
          })
        )
      }
    },
    [dispatch, isAuth, id, componentType, isInConfigurator]
  )

  return {
    addToBasket,
    toggleWishlist,
    toggleConfigurator,
    isInBasket,
    isInWishlist,
    isInConfigurator,
    isLoadingBasket,
    isLoadingWishlist,
    isLoadingConfigurator,
  }
}
