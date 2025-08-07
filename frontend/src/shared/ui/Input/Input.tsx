import { ChangeEvent, InputHTMLAttributes } from 'react'
import cls from './Input.module.less'
import { classNames } from '@/shared/lib/utils'
import { IconsMap } from '@/shared/consts/icons'
import { Icon } from '@/shared/ui/Icon'

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HtmlInputProps {
  className?: string
  value?: string
  onChangeFile?: (value: File | null) => void
  onChangeString?: (value: string) => void
  type?: string
  icon?: keyof typeof IconsMap
  onIconClick?: () => void
}

export const Input = ({
  className,
  value = '',
  onChangeFile,
  onChangeString,
  type = 'text',
  icon,
  onIconClick,
  ...otherProps
}: InputProps) => {
  const IconComponent = icon && IconsMap[icon]

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (type === 'file') {
      const file = e.target.files?.[0] || null
      onChangeFile?.(file)
    }
    onChangeString?.(e.target.value)
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
