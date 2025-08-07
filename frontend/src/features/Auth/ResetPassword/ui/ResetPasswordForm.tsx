import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './ResetPasswordForm.module.less'
import { PasswordInput } from '@/entities/User'
import { FormEvent, useCallback } from 'react'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import {
  getResetPasswordState,
  resetPasswordActions,
  resetPasswordReducer,
} from '@/features/Auth/ResetPassword'
import { DynamicModuleLoader } from '@/shared/lib/components'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { getFullRouteLogin } from '@/shared/consts/router'

const initialReducers = {
  resetPasswordForm: resetPasswordReducer,
}

export const ResetPasswordForm = () => {
  const { codeFromEmail, newPassword, isLoading, error } = useAppSelector(
    getResetPasswordState
  )
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const onChangeCode = useCallback(
    (value: string) => {
      dispatch(resetPasswordActions.setCodeFromEmail(value))
    },
    [dispatch]
  )

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(resetPasswordActions.setNewPassword(value))
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // const res = dispatch(resetPassword({codeFromEmail, newPassword}))
      const res = true
      if (res) {
        navigate(getFullRouteLogin())
      }
    },
    [dispatch, codeFromEmail, newPassword]
  )

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form className={cls.resetPasswordForm} onSubmit={handleSubmit}>
        <label
          htmlFor="code-from-email"
          className={cls.resetPasswordForm__label}
        >
          Код из письма
          <Input
            id={'code-from-email'}
            type={'number'}
            value={codeFromEmail}
            onChangeString={onChangeCode}
            placeholder={'Введите код'}
            className={cls.resetPasswordForm__input}
          />
        </label>
        <label htmlFor="password" className={cls.resetPasswordForm__label}>
          Новый пароль
          <PasswordInput
            className={cls.resetPasswordForm__input}
            value={newPassword}
            onChange={onChangePassword}
          />
        </label>
        {error && (
          <span className={cls.resetPasswordForm__errors}>
            {error}
            sdfsdf
          </span>
        )}
        <Button
          type={'submit'}
          theme={ButtonTheme.PRIMARY}
          fullWidth={true}
          size={ButtonSize.L}
          disabled={isLoading}
        >
          Войти
        </Button>
      </form>
    </DynamicModuleLoader>
  )
}
