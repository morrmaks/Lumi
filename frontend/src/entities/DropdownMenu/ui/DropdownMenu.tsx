import { MenuItem } from '@/shared/ui/MenuItem'
import {
  getRouteCatalog,
  getRouteConfigurator,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { IconsMap } from '@/shared/consts/icons'
import cls from './DropdownMenu.module.less'
import { useEffect } from 'react'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { getDropdownMenuState } from '@/entities/DropdownMenu'
import { classNames } from '@/shared/lib/classNames'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'

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
        <MenuItem
          to={getRouteCatalog()}
          Svg={IconsMap.CATALOG}
          className={cls.dropdownMenu__item}
          horizontal
        >
          Каталог
        </MenuItem>
        <MenuItem
          to={getRouteConfigurator()}
          Svg={IconsMap.CONFIGURATOR}
          className={cls.dropdownMenu__item}
          horizontal
        >
          Конфигуратор
        </MenuItem>
        <MenuItem
          to={getRouteWishlist()}
          Svg={IconsMap.WISHLIST}
          className={cls.dropdownMenu__item}
          horizontal
        >
          Избранное
        </MenuItem>
        <MenuItem
          to={getRouteProfile()}
          Svg={IconsMap.PROFILE}
          className={cls.dropdownMenu__item}
          horizontal
        >
          Профиль
        </MenuItem>
        <div>
          <ThemeSwitcher className={cls.dropdownMenu__themeSwitcher}>
            Тема
          </ThemeSwitcher>
        </div>
      </nav>
    </div>
  )
}
