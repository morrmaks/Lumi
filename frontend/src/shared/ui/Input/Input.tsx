import { ChangeEvent, InputHTMLAttributes } from 'react'
import cls from './Input.module.less'
import { classNames } from '@/shared/lib/classNames'
import { IconsMap } from '@/shared/consts/icons'
import { Icon } from '@/shared/ui/Icon'

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HtmlInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  icon?: keyof typeof IconsMap
  onIconClick?: () => void
}

export const Input = ({
  className,
  value = '',
  onChange,
  type = 'text',
  icon,
  onIconClick,
  ...otherProps
}: InputProps) => {
  const IconComponent = icon && IconsMap[icon]

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value)
  }

  return (
    <div className={cls.input__wrapper}>
      <input
        className={classNames(cls.input, {}, [className])}
        value={value}
        onChange={handleChange}
        type={type}
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
