import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './ForgotPasswordForm.module.less'
import {
  getFullRouteLogin,
  getFullRouteResetPassword,
} from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink'
import { useNavigate } from 'react-router-dom'
import { FormEvent, useCallback } from 'react'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import {
  forgotPasswordActions,
  forgotPasswordReducer,
  getForgotPasswordState,
} from '@/features/Auth/ForgotPassword'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { userActions } from '@/entities/User'

const initialReducers: ReducerList = {
  forgotPasswordForm: forgotPasswordReducer,
}

export const ForgotPasswordForm = () => {
  const { email, isLoading, error } = useAppSelector(getForgotPasswordState)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(forgotPasswordActions.setEmail(value))
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // const res = dispatch(sendCodeOnEmail({email}))
      dispatch(userActions.setIsForgotPassword()) //устанавливается после ответа в запросе строкой выше
      const res = true
      if (res) {
        navigate(getFullRouteResetPassword(), { replace: true })
      }
    },
    [dispatch, email]
  )

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form className={cls.forgotPasswordForm} onSubmit={handleSubmit}>
        <label htmlFor="email" className={cls.forgotPasswordForm__label}>
          Email
          <Input
            id={'email'}
            type={'email'}
            value={email}
            onChangeString={onChangeEmail}
            placeholder={'email@mail.com'}
            className={cls.forgotPasswordForm__input}
          />
        </label>
        {error && (
          <span className={cls.forgotPasswordForm__errors}>
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
          Отправить код
        </Button>
        <AppLink
          to={getFullRouteLogin()}
          className={cls.forgotPasswordForm__backLoginButton}
        >
          ← Вернуться ко входу
        </AppLink>
      </form>
    </DynamicModuleLoader>
  )
}
