import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './RegisterForm.module.less'
import { PasswordInput } from '@/entities/User'
import { FormEvent, useCallback } from 'react'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import {
  getRegisterState,
  registerActions,
  registerReducer,
} from '@/features/Register'
import { DynamicModuleLoader } from '@/shared/lib/components'
import { ButtonSize } from '@/shared/ui/Button/Button'

const initialReducers = {
  registerForm: registerReducer,
}

export const RegisterForm = () => {
  const { email, password, isLoading } = useAppSelector(getRegisterState)
  const dispatch = useAppDispatch()

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(registerActions.setEmail(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(registerActions.setPassword(value))
    },
    [dispatch]
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form className={cls.registerForm} onSubmit={handleSubmit}>
        <label htmlFor="email" className={cls.registerForm__label}>
          Email
          <Input
            id={'email'}
            type={'email'}
            value={email}
            onChange={onChangeEmail}
            placeholder={'email@mail.com'}
            className={cls.registerForm__input}
          />
        </label>
        <label htmlFor="password" className={cls.registerForm__label}>
          Пароль
          <PasswordInput
            className={cls.registerForm__input}
            value={password}
            onChange={onChangePassword}
          />
        </label>
        <Button
          type={'submit'}
          theme={ButtonTheme.PRIMARY}
          fullWidth={true}
          size={ButtonSize.L}
          disabled={isLoading}
        >
          Зарегистрироваться
        </Button>
      </form>
    </DynamicModuleLoader>
  )
}
