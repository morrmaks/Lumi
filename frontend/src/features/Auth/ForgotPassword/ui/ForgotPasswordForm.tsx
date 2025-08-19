import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './ForgotPasswordForm.module.less'
import {
  getFullRouteLogin,
  getFullRouteResetPassword,
} from '@/shared/consts/router'
import { AppLink } from '@/shared/ui/AppLink'
import { useNavigate } from 'react-router-dom'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { Placeholders } from '@/shared/consts'
import { usePostForgotPasswordMutation } from '@/entities/User/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { useEffect } from 'react'
import { forgotPasswordFormSchema, ForgotPasswordFormValues } from '../model'

const initialFormState: ForgotPasswordFormValues = {
  email: '',
}

export const ForgotPasswordForm = () => {
  const [
    forgotPasswordUser,
    { isSuccess, isLoading, error: forgotPasswordError },
  ] = usePostForgotPasswordMutation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange',
  })

  useEffect(() => {
    if (isSuccess) {
      navigate(getFullRouteResetPassword(), { replace: true })
    }
  }, [isSuccess])

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await forgotPasswordUser(data).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      className={cls.forgotPasswordForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="email" className={cls.forgotPasswordForm__label}>
        {Placeholders.features.auth.forgotPasswordForm.labels.email}
        <Input
          id={'email'}
          type={'email'}
          placeholder={
            Placeholders.features.auth.forgotPasswordForm.placeholders.email
          }
          className={cls.forgotPasswordForm__input}
          {...register('email')}
        />
        {errors.email && (
          <span className={cls.forgotPasswordForm__errors}>
            {errors.email.message}
          </span>
        )}
      </label>
      <ApiErrorMessage error={forgotPasswordError} />
      <Button
        type={'submit'}
        theme={ButtonTheme.PRIMARY}
        fullWidth={true}
        size={ButtonSize.L}
        disabled={isLoading}
      >
        {Placeholders.features.auth.forgotPasswordForm.submit}
      </Button>
      <AppLink
        to={getFullRouteLogin()}
        className={cls.forgotPasswordForm__backLoginButton}
      >
        {Placeholders.features.auth.forgotPasswordForm.onRouteLogin}
      </AppLink>
    </form>
  )
}
