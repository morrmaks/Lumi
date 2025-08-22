import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useCallback } from 'react'
import { getUserIsAuth } from '@/entities/User'
import {
  basketProductsActions,
  useAddBasketProductMutation,
} from '@/features/Basket'

export const useWishlistCardActions = (id: string) => {
  const isAuth = useAppSelector(getUserIsAuth)
  const dispatch = useAppDispatch()
  const [addToBasketProduct, { isLoading: isLoadingAddToBasket }] =
    useAddBasketProductMutation()

  const addToBasket = useCallback(async () => {
    if (isAuth) {
      const data = await addToBasketProduct(id)
      if (!data) return
    }
    dispatch(basketProductsActions.addProduct(id))
  }, [isAuth, dispatch, addToBasketProduct])

  return {
    addToBasket,
    isLoadingAddToBasket,
  }
}
