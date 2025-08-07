import { Input } from '@/shared/ui/Input'
import { useState } from 'react'

interface PasswordInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
  id?: string
}

export const PasswordInput = ({
  className,
  value,
  onChange,
  id,
}: PasswordInputProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <Input
      id={id ?? 'password'}
      type={isShow ? 'text' : 'password'}
      name={'password'}
      placeholder={'Введите пароль'}
      className={className}
      value={value}
      onChangeString={onChange}
      icon={isShow ? 'PASSWORD_HIDE' : 'PASSWORD_SHOW'}
      onIconClick={() => setIsShow(!isShow)}
    />
  )
}
