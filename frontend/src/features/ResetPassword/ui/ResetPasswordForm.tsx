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
} from '@/features/ResetPassword'
import { DynamicModuleLoader } from '@/shared/lib/components'
import { ButtonSize } from '@/shared/ui/Button/Button'

const initialReducers = {
  resetPasswordForm: resetPasswordReducer,
}

export const ResetPasswordForm = () => {
  const { codeFromEmail, newPassword, isLoading } = useAppSelector(
    getResetPasswordState
  )
  const dispatch = useAppDispatch()

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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

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
            onChange={onChangeCode}
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
