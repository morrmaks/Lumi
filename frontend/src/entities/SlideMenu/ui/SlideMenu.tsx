import { MenuItem } from '@/shared/ui/MenuItem'
import cls from './SlideMenu.module.less'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { slideMenuActions, getSlideMenuState } from '@/entities/SlideMenu'
import { classNames } from '@/shared/lib/utils'
import { ThemeSwitcher } from '@/shared/ui/ThemeSwitcher'
import { slideMenuLinks } from '../config'
import { Placeholders } from '@/shared/consts'
import { BurgerButton } from '@/shared/ui/BurgerButton'

export const SlideMenu = () => {
  const { isOpen: slideMenuIsOpen } = useAppSelector(getSlideMenuState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (slideMenuIsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [slideMenuIsOpen])

  const handleThemeClick = useCallback(() => {
    if (!slideMenuIsOpen) return
    dispatch(slideMenuActions.setIsOpen(false))
  }, [slideMenuIsOpen, dispatch])

  const handleOverlayClick = useCallback(() => {
    dispatch(slideMenuActions.setIsOpen(false))
  }, [dispatch])

  return (
    <div
      className={classNames(cls.dropdownMenu, {
        [cls.slideMenu_open]: slideMenuIsOpen,
      })}
    >
      <div
        className={cls.slideMenu__overlay}
        onClick={handleOverlayClick}
      ></div>
      <nav className={cls.slideMenu__wrapper}>
        <BurgerButton isOpen={true} />
        {slideMenuLinks.map(({ to, icon, label }) => (
          <MenuItem
            key={to}
            to={to}
            Svg={icon}
            className={cls.slideMenu__item}
            horizontal
          >
            {label}
          </MenuItem>
        ))}
        <div>
          <ThemeSwitcher
            className={cls.slideMenu__themeSwitcher}
            onClick={handleThemeClick}
          >
            {Placeholders.entities.dropdownMenu.onSwitchTheme}
          </ThemeSwitcher>
        </div>
      </nav>
    </div>
  )
}
