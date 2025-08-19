import { Input } from '@/shared/ui/Input'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './RegisterForm.module.less'
import { PasswordInput } from '@/entities/User'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { Placeholders } from '@/shared/consts'
import { usePostRegisterMutation } from '@/entities/User/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { registerFormSchema, RegisterFormValues } from '../model'

const initialFormState: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
}

export const RegisterForm = () => {
  const [registerUser, { isLoading, error: registerError }] =
    usePostRegisterMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange',
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      className={cls.registerForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="name" className={cls.registerForm__label}>
        {Placeholders.features.profile.cardForm.labels.name}
        <Input
          id={'name'}
          type={'text'}
          placeholder={Placeholders.features.profile.cardForm.placeholders.name}
          className={cls.registerForm__input}
          {...register('name')}
        />
      </label>
      <label htmlFor="email" className={cls.registerForm__label}>
        {Placeholders.features.auth.registerForm.labels.email}
        <Input
          id={'email'}
          type={'email'}
          placeholder={
            Placeholders.features.auth.registerForm.placeholders.email
          }
          className={cls.registerForm__input}
          {...register('email')}
        />
        {errors.email && (
          <span className={cls.registerForm__errors}>
            {errors.email.message}
          </span>
        )}
      </label>
      <label htmlFor="password" className={cls.registerForm__label}>
        {Placeholders.features.auth.registerForm.labels.password}
        <PasswordInput
          className={cls.registerForm__input}
          {...register('password')}
        />
        {errors.password && (
          <span className={cls.registerForm__errors}>
            {errors.password.message}
          </span>
        )}
      </label>
      <ApiErrorMessage error={registerError} />
      <Button
        type={'submit'}
        theme={ButtonTheme.PRIMARY}
        fullWidth={true}
        size={ButtonSize.L}
        disabled={isLoading}
      >
        {Placeholders.features.auth.registerForm.submit}
      </Button>
    </form>
  )
}
