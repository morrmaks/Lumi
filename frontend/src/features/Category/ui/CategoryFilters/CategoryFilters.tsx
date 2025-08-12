import { useCallback, useMemo } from 'react'
import cls from './CategoryFilters.module.less'
import { Select, SelectOption } from '@/shared/ui/Select'
import {
  getCategorySort,
  getCategoryView,
  SortFieldOptions,
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

export const CategoryFilters = () => {
  const view = useAppSelector(getCategoryView)
  const sort = useAppSelector(getCategorySort)
  const dispatch = useAppDispatch()
  const { sm } = useBreakpoint()

  const fieldOptions = useMemo<SelectOption<SortFieldOptions>[]>(
    () => [
      { value: SortFieldOptions.PRICE_ASC, content: 'По возрастанию цены' },
      { value: SortFieldOptions.PRICE_DESC, content: 'По убыванию цены' },
      { value: SortFieldOptions.REVIEWS_ASC, content: 'По рейтингу' },
    ],
    []
  )

  const onChangeSort = useCallback(
    (sort: SortFieldOptions) => {
      dispatch(categoryPageActions.setSort(sort))
      dispatch(categoryPageActions.setPage(1))
      //dispatch(fetchCategoriesProducts())
    },
    [dispatch]
  )

  const onChangeView = useCallback(
    (view: ViewFormat) => {
      dispatch(categoryPageActions.setView(view))
      dispatch(categoryPageActions.setPage(1))
    },
    [dispatch]
  )

  return (
    <div className={cls.categoryFilters}>
      <Select<SortFieldOptions>
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
  )
}
