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
      ...otherProps
    },
    ref
  ) => {
    const IconComponent = icon && IconsMap[icon]

    const handleChange = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (type === 'file' && onChangeFile) {
          console.log(1)
          const file = e.target.files?.[0] || null
          onChangeFile?.(file)
        } else {
          console.log(e.target.value)
          onChangeString?.(e.target.value)
        }
      },
      [onChangeFile]
    )

    return (
      <div className={cls.input__wrapper}>
        <input
          className={classNames(cls.input, {}, [className])}
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          {...otherProps}
        />
        {IconComponent && (
          <Icon
            className={cls.input__icon}
            Svg={IconComponent}
            onClick={onIconClick}
          />
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
