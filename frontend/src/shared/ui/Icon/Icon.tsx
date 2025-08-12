import { classNames, Mods } from '@/shared/lib/utils/classNames/classNames'
import cls from './Icon.module.less'
import { IconTheme } from '@/shared/consts/iconTheme'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
  theme?: IconTheme
}

export const Icon = ({
  className,
  Svg,
  onClick,
  theme = IconTheme.PRIMARY,
  ...props
}: IconProps) => {
  const mods: Mods = {
    [cls[theme]]: true,
  }

  return (
    <Svg
      className={classNames(cls.icon, mods, [className])}
      onClick={onClick}
      {...props}
    />
  )
}
