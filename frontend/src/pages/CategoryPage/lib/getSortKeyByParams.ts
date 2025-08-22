import {
  SortFieldOptionKey,
  SortFieldOptions,
  ViewFormat,
} from '@/pages/CategoryPage'
import { LocalStorage } from '@/shared/consts'

export const getSortKeyByParams = (
  field: string | null,
  order: string | null
): SortFieldOptionKey => {
  if (!field || !order) return 'CREATED_DESC'

  return (
    (Object.keys(SortFieldOptions) as SortFieldOptionKey[]).find(
      (key) =>
        SortFieldOptions[key].field === field &&
        SortFieldOptions[key].order === order
    ) ?? 'CREATED_DESC'
  )
}

export const getInitialView = (view: string | null) => {
  const viewFormat =
    view ?? localStorage.getItem(LocalStorage.PRODUCTS_VIEW) ?? ViewFormat.GRID
  return viewFormat as ViewFormat
}
