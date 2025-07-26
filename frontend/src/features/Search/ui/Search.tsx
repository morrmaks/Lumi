import { Input } from '@/shared/ui/Input'
import cls from './Search.module.less'
import { Icon } from '@/shared/ui/Icon'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { useState } from 'react'
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint'
import { Button } from '@/shared/ui/Button'

export const Search = () => {
  const [value, setValue] = useState<string>('')
  const { md } = useBreakpoint()

  return (
    <div className={cls.search}>
      {md ? (
        <>
          <Icon Svg={SearchIcon} className={cls.search__icon} />
          <Input
            className={cls.search__input}
            onChange={setValue}
            value={value}
            placeholder="Поиск по сайту"
          />
        </>
      ) : (
        <Button>
          <Icon Svg={SearchIcon} className={cls.search__icon} />
        </Button>
      )}
    </div>
  )
}
