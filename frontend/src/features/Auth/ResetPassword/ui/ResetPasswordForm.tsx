import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './ResetPasswordForm.module.less'
import { PasswordInput } from '@/entities/User'
import { useAppSelector } from '@/shared/lib/hooks'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { Placeholders } from '@/shared/consts'
import { usePostResetPasswordMutation } from '@/entities/User/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  getForgotPasswordEmail,
  resetPasswordFormSchema,
  ResetPasswordFormValues,
} from '@/features/Auth'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { Loader } from '@/shared/ui/Loader'

const initialFormState: ResetPasswordFormValues = {
  code: '',
  password: '',
}

export const ResetPasswordForm = () => {
  const email = useAppSelector(getForgotPasswordEmail)
  const [resetPasswordUser, { isLoading, error: resetPasswordError }] =
    usePostResetPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange',
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPasswordUser({ email: email, ...data }).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      className={cls.resetPasswordForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="code-from-email" className={cls.resetPasswordForm__label}>
        {Placeholders.features.auth.resetPasswordForm.labels.code}
        <Input
          id={'code-from-email'}
          type={'number'}
          placeholder={
            Placeholders.features.auth.resetPasswordForm.placeholders.code
          }
          disabled={isLoading}
          className={cls.resetPasswordForm__input}
          {...register('code')}
        />
        {errors.code && (
          <span className={cls.resetPasswordForm__errors}>
            {errors.code.message}
          </span>
        )}
      </label>
      <label htmlFor="password" className={cls.resetPasswordForm__label}>
        {Placeholders.features.auth.resetPasswordForm.labels.password}
        <PasswordInput {...register('password')} disabled={isLoading} />
        {errors.password && (
          <span className={cls.resetPasswordForm__errors}>
            {errors.password.message}
          </span>
        )}
      </label>
      <ApiErrorMessage error={resetPasswordError} />
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
          Placeholders.features.auth.resetPasswordForm.submit
        )}
      </Button>
    </form>
  )
}
