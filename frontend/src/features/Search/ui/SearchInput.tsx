import { Input } from '@/shared/ui/Input'
import cls from './SearchInput.module.less'
import { Placeholders } from '@/shared/consts'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { getCategorySearch } from '@/pages/CategoryPage'
import { categoryPageActions } from '@/pages/CategoryPage'

export const SearchInput = () => {
  const search = useAppSelector(getCategorySearch)
  const dispatch = useAppDispatch()

  const handleChange = (value: string) => {
    dispatch(categoryPageActions.setPage(1))
    dispatch(categoryPageActions.setSearch(value))
  }

  return (
    <div className={cls.search}>
      <Input
        className={cls.search__input}
        onChangeString={handleChange}
        value={search}
        placeholder={Placeholders.features.search.input.placeholder}
        icon={'SEARCH'}
      />
    </div>
  )
}
