import { Input } from '@/shared/ui/Input'
import cls from './SearchInput.module.less'
import { Placeholders } from '@/shared/consts'
import {
  useAppDispatch,
  useAppSelector,
  useDebounceCallback,
} from '@/shared/lib/hooks'
import { getCategorySearch } from '@/pages/CategoryPage'
import { categoryPageActions } from '@/pages/CategoryPage'
import { useEffect, useState } from 'react'

export const SearchInput = () => {
  const search = useAppSelector(getCategorySearch)
  const dispatch = useAppDispatch()
  const [state, setState] = useState(search)
  const debouncedDispatch = useDebounceCallback<string>((value) => {
    dispatch(categoryPageActions.setPage(1))
    dispatch(categoryPageActions.setSearch(value))
  }, 300)

  const handleChange = (value: string) => {
    setState(value)
    debouncedDispatch(value)
  }

  useEffect(() => {
    if (search !== state) {
      setState(search)
    }
  }, [search])

  return (
    <div className={cls.search}>
      <Input
        className={cls.search__input}
        onChangeString={handleChange}
        value={state}
        placeholder={Placeholders.features.search.input.placeholder}
        icon={'SEARCH'}
      />
    </div>
  )
}
