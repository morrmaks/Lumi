import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { getFullRouteForgotPassword } from '@/shared/consts/router'
import cls from './LoginForm.module.less'
import { PasswordInput } from '@/entities/User'
import { FormEvent, useCallback } from 'react'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { getLoginState, loginActions, loginReducer } from '@/features/Login'
import { DynamicModuleLoader } from '@/shared/lib/components'
import { ButtonSize } from '@/shared/ui/Button/Button'

const initialReducers = {
  loginForm: loginReducer,
}

export const LoginForm = () => {
  const { email, password, isLoading } = useAppSelector(getLoginState)
  const dispatch = useAppDispatch()

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(loginActions.setEmail(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value))
    },
    [dispatch]
  )

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form className={cls.loginForm} onSubmit={handleSubmit}>
        <label htmlFor="email" className={cls.loginForm__label}>
          Email
          <Input
            id={'email'}
            type={'email'}
            value={email}
            onChange={onChangeEmail}
            placeholder={'email@mail.com'}
            className={cls.loginForm__input}
          />
        </label>
        <label htmlFor="password" className={cls.loginForm__label}>
          Пароль
          <PasswordInput
            className={cls.loginForm__input}
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
          Войти
        </Button>
        <AppLink
          to={getFullRouteForgotPassword()}
          className={cls.loginForm__forgotButton}
        >
          Забыли пароль?
        </AppLink>
      </form>
    </DynamicModuleLoader>
  )
}
