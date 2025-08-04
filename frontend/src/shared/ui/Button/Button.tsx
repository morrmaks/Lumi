import { classNames } from '@/shared/lib/classNames'
import { ButtonHTMLAttributes } from 'react'
import cls from './Button.module.less'
import { Mods } from '@/shared/lib/classNames/classNames'

export const ButtonTheme = {
  PRIMARY: 'primaryButton',
  OUTLINE: 'outlineButton',
  SECONDARY: 'secondaryButton',
  STATIC: 'staticButton',
} as const

export type ButtonTheme = (typeof ButtonTheme)[keyof typeof ButtonTheme]

export const ButtonSize = {
  S: 'size_s',
  M: 'size_m',
  L: 'size_l',
} as const

export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize]

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  disabled?: boolean
  theme?: ButtonTheme
  size?: ButtonSize
  square?: boolean
  fullWidth?: boolean
  withBorder?: boolean
  resetPadding?: boolean
}

export const Button = ({
  children,
  className,
  disabled = false,
  square,
  fullWidth,
  resetPadding,
  withBorder,
  theme = ButtonTheme.PRIMARY,
  size = ButtonSize.M,
  ...otherProps
}: ButtonProps) => {
  const mods: Mods = {
    [cls[theme]]: true,
    [cls[size]]: true,
    [cls.square]: square,
    [cls.fullWidth]: fullWidth,
    [cls.resetPadding]: resetPadding,
    [cls.withBorder]: withBorder,
  }

  return (
    <button
      className={classNames(cls.button, mods, [className, cls[theme]])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  )
}
