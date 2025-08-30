import { useCallback, useMemo } from 'react'
import cls from './CategoryFilters.module.less'
import { Select, SelectOption } from '@/shared/ui/Select'
import {
  getCategorySort,
  getCategoryView,
  SortFieldOptionKey,
  ViewFormat,
} from '@/pages/CategoryPage'
import {
  useAppDispatch,
  useAppSelector,
  useBreakpoint,
} from '@/shared/lib/hooks'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { classNames } from '@/shared/lib/utils'
import { categoryPageActions } from '@/pages/CategoryPage/model/slice/categoryPageSlice'
import { SearchInput } from '@/features/Search'
import { CategoryFiltersSkeleton } from './CategoryFiltersSkeleton'

export interface CategoryFiltersProps {
  categoryIsLoading?: boolean
}

export const CategoryFilters = ({
  categoryIsLoading,
}: CategoryFiltersProps) => {
  const view = useAppSelector(getCategoryView)
  const sort = useAppSelector(getCategorySort)
  const dispatch = useAppDispatch()
  const { sm } = useBreakpoint()

  const fieldOptions = useMemo<SelectOption<SortFieldOptionKey>[]>(
    () => [
      { value: 'PRICE_ASC', content: 'По возрастанию цены' },
      { value: 'PRICE_DESC', content: 'По убыванию цены' },
      { value: 'REVIEWS_ASC', content: 'По рейтингу' },
      { value: 'CREATED_DESC', content: 'По умолчанию' },
    ],
    []
  )

  const onChangeSort = useCallback(
    (sort: SortFieldOptionKey) => {
      dispatch(categoryPageActions.setPage(1))
      dispatch(categoryPageActions.setSort(sort))
    },
    [dispatch]
  )

  const onChangeView = useCallback(
    (view: ViewFormat) => {
      dispatch(categoryPageActions.setPage(1))
      dispatch(categoryPageActions.setView(view))
      dispatch(categoryPageActions.setLimit(view === ViewFormat.GRID ? 8 : 4))
    },
    [dispatch]
  )

  if (categoryIsLoading) return <CategoryFiltersSkeleton />

  return (
    <div className={cls.categoryFilters}>
      <div className={cls.categoryFilters__search}>
        <SearchInput />
      </div>
      <div className={cls.categoryFilters__sortFilters}>
        <Select<SortFieldOptionKey>
          value={sort}
          options={fieldOptions}
          onChange={onChangeSort}
        />
        {sm && (
          <div className={cls.categoryFilters__viewFormat}>
            <Icon
              className={classNames(cls.categoryFilters__viewFormatIcon, {
                [cls.categoryFilters__viewFormatIcon_active]:
                  view === ViewFormat.GRID,
              })}
              Svg={IconsMap.GRID}
              onClick={() => onChangeView(ViewFormat.GRID)}
            />
            <Icon
              className={classNames(cls.categoryFilters__viewFormatIcon, {
                [cls.categoryFilters__viewFormatIcon_active]:
                  view === ViewFormat.LIST,
              })}
              Svg={IconsMap.LIST}
              onClick={() => onChangeView(ViewFormat.LIST)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
