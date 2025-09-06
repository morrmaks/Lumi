import { useEffect } from 'react'
import {
  SortFieldOptionKey,
  SortFieldOptions,
  ViewFormat,
} from '@/pages/CategoryPage'
import { setQueryParams } from '@/shared/lib/url'

interface IUseSyncQueryParams {
  search: string
  sort: SortFieldOptionKey
  view: ViewFormat
  page: number
  limit: number
}

export const useSyncQueryParams = (deps: IUseSyncQueryParams) => {
  useEffect(() => {
    const { field, order } = SortFieldOptions[deps.sort] || {}
    const params = {
      search: deps.search,
      field,
      order,
      view: deps.view,
      page: deps.page.toString(),
      limit: deps.limit.toString(),
    }
    setQueryParams(params)
  }, [deps])
}
