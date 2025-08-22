import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useCallback } from 'react'
import { getUserIsAuth } from '@/entities/User'
import {
  basketProductsActions,
  useDecreaseBasketProductQuantityMutation,
  useDeleteBasketProductMutation,
  useIncreaseBasketProductQuantityMutation,
} from '@/features/Basket'

export const useBasketCardActions = (id: string) => {
  const isAuth = useAppSelector(getUserIsAuth)
  const dispatch = useAppDispatch()

  const [deleteBasketProduct, { isLoading: isLoadingDeleteBasketProduct }] =
    useDeleteBasketProductMutation()
  const [decreaseBasketProduct, { isLoading: isLoadingDecreaseBasketProduct }] =
    useDecreaseBasketProductQuantityMutation()
  const [increaseBasketProduct, { isLoading: isLoadingIncreaseBasketProduct }] =
    useIncreaseBasketProductQuantityMutation()

  const isLoading =
    isLoadingDeleteBasketProduct ||
    isLoadingDecreaseBasketProduct ||
    isLoadingIncreaseBasketProduct

  const removeCard = useCallback(() => {
    if (isAuth) deleteBasketProduct(id)
    dispatch(basketProductsActions.removeProduct(id))
  }, [isAuth])

  const decrementCard = useCallback(() => {
    if (isAuth) decreaseBasketProduct(id)
    dispatch(basketProductsActions.decreaseProductQuantity(id))
  }, [isAuth])

  const incrementCard = useCallback(() => {
    if (isAuth) increaseBasketProduct(id)
    dispatch(basketProductsActions.addProduct(id))
  }, [isAuth])

  return {
    removeCard,
    decrementCard,
    incrementCard,
    isLoading,
    deleteBasketProduct,
    decreaseBasketProduct,
    increaseBasketProduct,
  }
}
