import { ChangeEvent, InputHTMLAttributes } from 'react'
import cls from './Input.module.less'
import { classNames } from '@/shared/lib/classNames'

type HtmlInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>

interface InputProps extends HtmlInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
}

export const Input = ({
  className,
  value = '',
  onChange,
  type = 'text',
  ...otherProps
}: InputProps) => {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.value)
  }

  return (
    <input
      className={classNames(cls.input, {}, [className])}
      value={value}
      onChange={handleChange}
      type={type}
      {...otherProps}
    />
  )
}
