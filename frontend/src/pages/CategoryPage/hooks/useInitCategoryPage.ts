import { useEffect } from 'react'
import {
  categoryPageActions,
  getInitialView,
  getSortKeyByParams,
  ICategoryWithBreadcrumb,
} from '@/pages/CategoryPage'
import { useAppDispatch } from '@/shared/lib/hooks'

export const useInitCategoryPage = (
  dispatch: ReturnType<typeof useAppDispatch>,
  data: ICategoryWithBreadcrumb | undefined,
  categoryId: string,
  searchParams: URLSearchParams
) => {
  useEffect(() => {
    dispatch(categoryPageActions.resetCategoryPage())
    if (data?.category) dispatch(categoryPageActions.setCategory(data.category))

    const field = searchParams.get('field')
    const order = searchParams.get('order')
    const search = searchParams.get('search')
    const view = searchParams.get('view')
    dispatch(
      categoryPageActions.initFilters({
        search: search ?? '',
        sort: getSortKeyByParams(field, order),
        view: getInitialView(view),
      })
    )

    return () => {
      dispatch(categoryPageActions.resetCategoryPage())
    }
  }, [data, dispatch, categoryId])
}
