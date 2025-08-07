import { classNames } from '@/shared/lib/utils'
import { Link, LinkProps } from 'react-router-dom'

interface AppLinkProps extends LinkProps {
  className?: string
  theme?: string
}

export const AppLink = ({
  to,
  className,
  theme,
  children,
  ...otherProps
}: AppLinkProps) => {
  return (
    <Link
      className={classNames('', {}, [className, theme])}
      to={to}
      {...otherProps}
    >
      {children}
    </Link>
  )
}
