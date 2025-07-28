import { classNames } from '@/shared/lib/classNames'
import { AnchorHTMLAttributes } from 'react'

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string
  theme?: string
}

export const ExternalLink = ({
  href,
  className,
  children,
  ...otherProps
}: ExternalLinkProps) => {
  return (
    <a
      className={classNames('', {}, [className])}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...otherProps}
    >
      {children}
    </a>
  )
}
