import { classNames, Mods } from '@/shared/lib/utils/classNames/classNames'
import cls from './Icon.module.less'

export const IconTheme = {
  PRIMARY: 'icon__primary',
  YELLOW: 'icon__yellow',
} as const

export type IconTheme = (typeof IconTheme)[keyof typeof IconTheme]

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
