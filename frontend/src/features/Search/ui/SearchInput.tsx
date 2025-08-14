import { Input } from '@/shared/ui/Input'
import cls from './SearchInput.module.less'
import { useState } from 'react'
import { Placeholders } from '@/shared/consts'

export const SearchInput = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className={cls.search}>
      <Input
        className={cls.search__input}
        onChangeString={setValue}
        value={value}
        placeholder={Placeholders.features.search.input.placeholder}
        icon={'SEARCH'}
      />
    </div>
  )
}
