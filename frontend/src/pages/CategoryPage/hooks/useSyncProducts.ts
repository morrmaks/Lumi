import { useEffect } from 'react'
import { categoryPageActions, ICategoryProduct } from '@/pages/CategoryPage'
import { useAppDispatch } from '@/shared/lib/hooks'

export const useSyncProducts = (
  products: ICategoryProduct[] | undefined,
  page: number,
  limit: number,
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  useEffect(() => {
    if (!products) return
    if (page === 1) {
      dispatch(categoryPageActions.setProducts(products))
      console.log('page', page)
    } else {
      dispatch(categoryPageActions.addProducts(products))
      console.log('page2', page)
    }
    dispatch(categoryPageActions.setHasMore(products.length >= (limit ?? 8)))
  }, [products, dispatch])
}
