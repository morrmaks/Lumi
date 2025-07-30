import { Input } from '@/shared/ui/Input'
import { useState } from 'react'

interface PasswordInputProps {
  className?: string
  value?: string
  onChange?: (value: string) => void
}

export const PasswordInput = ({
  className,
  value,
  onChange,
}: PasswordInputProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)

  return (
    <Input
      id={'password'}
      type={isShow ? 'text' : 'password'}
      name={'password'}
      placeholder={'Введите пароль'}
      className={className}
      value={value}
      onChange={onChange}
      icon={isShow ? 'PASSWORD_HIDE' : 'PASSWORD_SHOW'}
      onIconClick={() => setIsShow(!isShow)}
    />
  )
}
