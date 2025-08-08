import { Input } from '@/shared/ui/Input'
import cls from './SearchInput.module.less'
import { useState } from 'react'

export const SearchInput = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className={cls.search}>
      <Input
        className={cls.search__input}
        onChangeString={setValue}
        value={value}
        placeholder="Поиск по сайту"
        icon={'SEARCH'}
      />
    </div>
  )
}
