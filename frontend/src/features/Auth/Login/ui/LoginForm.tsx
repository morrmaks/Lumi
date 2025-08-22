import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { getFullRouteForgotPassword } from '@/shared/consts/router'
import cls from './LoginForm.module.less'
import { PasswordInput } from '@/entities/User'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { Placeholders } from '@/shared/consts'
import { usePostLoginMutation } from '@/entities/User/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { loginFormSchema, LoginFormValues } from '@/features/Auth'
import { Loader } from '@/shared/ui/Loader'

const initialFormState: LoginFormValues = {
  email: '',
  password: '',
}

export const LoginForm = () => {
  const [loginUser, { isLoading, error: loginError }] = usePostLoginMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await loginUser(data).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      className={cls.loginForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="email" className={cls.loginForm__label}>
        {Placeholders.features.auth.loginForm.labels.email}
        <Input
          id={'email'}
          type={'email'}
          placeholder={Placeholders.features.auth.loginForm.placeholders.email}
          className={cls.loginForm__input}
          {...register('email')}
        />
        {errors.email && (
          <span className={cls.loginForm__errors}>{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="password" className={cls.loginForm__label}>
        {Placeholders.features.auth.loginForm.labels.password}
        <PasswordInput
          className={cls.loginForm__input}
          {...register('password')}
        />
        {errors.password && (
          <span className={cls.loginForm__errors}>
            {errors.password.message}
          </span>
        )}
      </label>
      <ApiErrorMessage error={loginError} />
      <Button
        type={'submit'}
        theme={ButtonTheme.PRIMARY}
        fullWidth={true}
        size={ButtonSize.L}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader delay={0} />
        ) : (
          Placeholders.features.auth.loginForm.submit
        )}
      </Button>
      <AppLink
        to={getFullRouteForgotPassword()}
        className={cls.loginForm__forgotButton}
      >
        {Placeholders.features.auth.loginForm.onRouteForgotPassword}
      </AppLink>
    </form>
  )
}
