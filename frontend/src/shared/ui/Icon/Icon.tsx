import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.less'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
}

export const Icon = ({ className, Svg, onClick, ...props }: IconProps) => {
  return (
    <Svg
      className={classNames(cls.icon, {}, [className])}
      onClick={onClick}
      {...props}
    />
  )
}
