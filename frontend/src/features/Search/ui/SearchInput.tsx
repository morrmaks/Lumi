import { Input } from '@/shared/ui/Input'
import cls from './SearchInput.module.less'
import { Icon } from '@/shared/ui/Icon'
import { useState } from 'react'
import { IconsMap } from '@/shared/consts/icons'

export const SearchInput = () => {
  const [value, setValue] = useState<string>('')

  return (
    <div className={cls.search}>
      <Icon Svg={IconsMap.SEARCH} className={cls.search__icon} />
      <Input
        className={cls.search__input}
        onChange={setValue}
        value={value}
        placeholder="Поиск по сайту"
      />
    </div>
  )
}
