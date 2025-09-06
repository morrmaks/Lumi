import { classNames } from '@/shared/lib/utils'
import { AnchorHTMLAttributes } from 'react'

export interface ExternalLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
      data-testid="external-link"
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
