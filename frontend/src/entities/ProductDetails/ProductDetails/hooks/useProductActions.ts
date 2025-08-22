import {
  useAppDispatch,
  useAppSelector,
  useCheckInBasket,
  useCheckInConfigurator,
  useCheckInWishlist,
} from '@/shared/lib/hooks'
import { useCallback } from 'react'
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
  useAddConfigureComponentMutation,
  useDeleteConfigureComponentMutation,
} from '@/features/Configurator/api'
import {
  ComponentTypes,
  configuratorComponentsActions,
} from '@/features/Configurator'

export const useProductActions = (
  id: string,
  componentType?: ComponentTypes
) => {
  const isAuth = useAppSelector(getUserIsAuth)
  const dispatch = useAppDispatch()

  const [addToWishlist, { isLoading: isLoadingAddToWishlist }] =
    useAddWishlistProductMutation()
  const [deleteFromWishlist, { isLoading: isLoadingDeleteFromWishlist }] =
    useDeleteWishlistProductMutation()
  const [addToBasketProduct, { isLoading: isLoadingBasket }] =
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

  const handleAddToBasket = useCallback(async () => {
    if (isAuth) {
      const data = await addToBasketProduct(id)
      if (!data) return
    }
    dispatch(basketProductsActions.addProduct(id))
  }, [isAuth, dispatch, id])

  const handleToggleWishlist = useCallback(async () => {
    if (isAuth) {
      if (isInWishlist) await deleteFromWishlist(id)
      else await addToWishlist(id)
    }
    dispatch(
      isInWishlist
        ? wishlistProductsActions.removeProduct(id)
        : wishlistProductsActions.addProduct(id)
    )
  }, [dispatch, isAuth, id, isInWishlist])

  const handleToggleConfigurator = useCallback(async () => {
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
  }, [dispatch, isAuth, id, componentType, isInConfigurator])

  return {
    handleAddToBasket,
    handleToggleConfigurator,
    handleToggleWishlist,
    isInBasket,
    isInWishlist,
    isInConfigurator,
    isLoadingBasket,
    isLoadingWishlist,
    isLoadingConfigurator,
  }
}
