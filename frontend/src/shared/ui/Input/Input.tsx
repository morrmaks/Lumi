import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
} from 'react'
import cls from './Input.module.less'
import { classNames } from '@/shared/lib/utils'
import { IconsMap } from '@/shared/consts/icons'
import { Icon } from '@/shared/ui/Icon'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  type?: string
  icon?: keyof typeof IconsMap
  onIconClick?: () => void
  value?: string
  onChangeFile?: (file: string | File | null) => void
  onChangeString?: (value: string) => void
  disabled?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      icon,
      onIconClick,
      onChangeFile,
      onChangeString,
      value,
      disabled,
      ...otherProps
    },
    ref
  ) => {
    const IconComponent = icon && IconsMap[icon]

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'file' && onChangeFile) {
          const file = e.target.files?.[0] || null
          onChangeFile?.(file)
        } else {
          onChangeString?.(e.target.value)
        }
      },
      [onChangeFile]
    )

    return (
      <div
        className={classNames(
          cls.input__wrapper,
          { [cls.input__wrapper_disabled]: disabled },
          []
        )}
      >
        {IconComponent && (
          <Icon
            className={cls.input__icon}
            Svg={IconComponent}
            onClick={onIconClick}
          />
        )}
        <input
          className={classNames(cls.input, {}, [className])}
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          {...otherProps}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'
