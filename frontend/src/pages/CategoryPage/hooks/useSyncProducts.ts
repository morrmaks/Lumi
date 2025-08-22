import { useEffect } from 'react'
import { categoryPageActions } from '@/pages/CategoryPage'
import { useAppDispatch } from '@/shared/lib/hooks'
import { ApiError } from '@/shared/types'
import { SerializedError } from '@reduxjs/toolkit'
import { CategoryProductsWithHasMore } from '@/features/Category'

export const useSyncProducts = (
  productsData: CategoryProductsWithHasMore | undefined,
  error: ApiError | SerializedError | undefined,
  page: number,
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  useEffect(() => {
    if (!productsData || productsData.products.length === 0 || error) {
      dispatch(categoryPageActions.setProducts([]))
      return
    }
    dispatch(categoryPageActions.setHasMore(productsData.hasMore))
    if (page === 1) {
      dispatch(categoryPageActions.setProducts(productsData.products))
    } else {
      dispatch(categoryPageActions.addProducts(productsData.products))
    }
  }, [productsData, dispatch, error])
}
