import { MenuItem } from '@/shared/ui/MenuItem'
import cls from './DropdownMenu.module.less'
import { useEffect } from 'react'
import { useAppSelector } from '@/shared/lib/hooks'
import { getDropdownMenuState } from '@/entities/DropdownMenu'
import { classNames } from '@/shared/lib/utils'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { dropdownMenuLinks } from '@/entities/DropdownMenu/config/DropdownMenuLinks'
import { Placeholders } from '@/shared/consts'

export const DropdownMenu = () => {
  const { isOpen: dropdownMenuIsOpen } = useAppSelector(getDropdownMenuState)

  useEffect(() => {
    if (dropdownMenuIsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [dropdownMenuIsOpen])

  return (
    <div
      className={classNames(cls.dropdownMenu, {
        [cls.dropdownMenu_open]: dropdownMenuIsOpen,
      })}
    >
      <nav className={cls.dropdownMenu__wrapper}>
        {dropdownMenuLinks.map(({ to, icon, label }) => (
          <MenuItem
            key={to}
            to={to}
            Svg={icon}
            className={cls.dropdownMenu__item}
            horizontal
          >
            {label}
          </MenuItem>
        ))}
        <div>
          <ThemeSwitcher className={cls.dropdownMenu__themeSwitcher}>
            {Placeholders.entities.dropdownMenu.onSwitchTheme}
          </ThemeSwitcher>
        </div>
      </nav>
    </div>
  )
}
