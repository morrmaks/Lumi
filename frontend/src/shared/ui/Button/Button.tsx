import { classNames } from '@/shared/lib/classNames'
import { ButtonHTMLAttributes } from 'react'
import cls from './Button.module.less'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  disabled?: boolean
}

export const Button = ({
  children,
  className,
  disabled = false,
  ...otherProps
}: ButtonProps) => {
  return (
    <button
      className={classNames(cls.button, {}, [className])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
}
