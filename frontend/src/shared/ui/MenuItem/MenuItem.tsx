import { AppLink } from '@/shared/ui/AppLink'
import cls from './MenuItem.module.less'
import { Icon } from '@/shared/ui/Icon'
import { classNames } from '@/shared/lib/classNames'

interface MenuItemProps {
  to: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
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
  return (
    <AppLink
      to={to}
      className={classNames(
        cls.menuItem,
        { [cls.menuItem_horizontal]: horizontal },
        [className]
      )}
    >
      <Icon Svg={Svg} className={cls.menuItem_icon} />
      {children}
    </AppLink>
  )
}
