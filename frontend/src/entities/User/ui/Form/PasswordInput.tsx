import { Input } from '@/shared/ui/Input'
import { forwardRef, InputHTMLAttributes, useState } from 'react'
import { Placeholders } from '@/shared/consts'
import { classNames } from '@/shared/lib/utils'
import cls from './PasswordInput.module.less'

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  name?: string
  value?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ id, ...otherProps }, ref) => {
    const [isShow, setIsShow] = useState<boolean>(false)

    return (
      <Input
        ref={ref}
        id={id ?? 'password'}
        type={isShow ? 'text' : 'password'}
        placeholder={Placeholders.entities.user.passwordInput.placeholder}
        className={classNames(cls.passwordInput, {}, [])}
        icon={isShow ? 'PASSWORD_HIDE' : 'PASSWORD_SHOW'}
        onIconClick={() => setIsShow(!isShow)}
        {...otherProps}
      />
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
