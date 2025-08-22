import { MenuItem } from '@/shared/ui/MenuItem'
import cls from './DropdownMenu.module.less'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {
  dropdownMenuActions,
  getDropdownMenuState,
} from '@/entities/DropdownMenu'
import { classNames } from '@/shared/lib/utils'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { dropdownMenuLinks } from '@/entities/DropdownMenu/config/DropdownMenuLinks'
import { Placeholders } from '@/shared/consts'

export const DropdownMenu = () => {
  const { isOpen: dropdownMenuIsOpen } = useAppSelector(getDropdownMenuState)
  const dispatch = useAppDispatch()

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

  const handleThemeClick = useCallback(() => {
    if (!dropdownMenuIsOpen) return
    dispatch(dropdownMenuActions.setIsOpen(false))
  }, [dropdownMenuIsOpen, dispatch])

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
          <ThemeSwitcher
            className={cls.dropdownMenu__themeSwitcher}
            onClick={handleThemeClick}
          >
            {Placeholders.entities.dropdownMenu.onSwitchTheme}
          </ThemeSwitcher>
        </div>
      </nav>
    </div>
  )
}
