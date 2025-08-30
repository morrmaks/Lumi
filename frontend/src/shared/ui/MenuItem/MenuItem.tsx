import { AppLink } from '@/shared/ui/AppLink'
import cls from './MenuItem.module.less'
import { Icon } from '@/shared/ui/Icon'
import { classNames } from '@/shared/lib/utils'
import { useCallback, useEffect, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks'
import {
  dropdownMenuActions,
  getDropdownMenuState,
} from '@/entities/DropdownMenu'
import { useAppSelector } from '@/shared/lib/hooks'

export interface MenuItemProps {
  to: string
  Svg?: React.FC<React.SVGProps<SVGSVGElement>>
  className?: string
  children?: React.ReactNode
  horizontal?: boolean
}

export const MenuItem = ({
  to,
  Svg,
  className,
  children,
  horizontal,
}: MenuItemProps) => {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const { isOpen: dropdownMenuIsOpen } = useAppSelector(getDropdownMenuState)
  const dispatch = useAppDispatch()

  const handleClick = useCallback(() => {
    startTransition(() => {
      navigate(to)
    })
  }, [navigate, to])

  useEffect(() => {
    if (!isPending && dropdownMenuIsOpen) {
      dispatch(dropdownMenuActions.setIsOpen(false))
    }
  }, [isPending, dispatch])

  return (
    <AppLink
      to={to}
      onClick={handleClick}
      className={classNames(
        cls.menuItem,
        { [cls.menuItem_horizontal]: horizontal },
        [className]
      )}
    >
      {Svg ? <Icon Svg={Svg} className={cls.menuItem_icon} /> : null}
      {children}
    </AppLink>
  )
}
