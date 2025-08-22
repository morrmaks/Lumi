import cls from './ProfileCardForm.module.less'
import { Input } from '@/shared/ui/Input'
import { Placeholders } from '@/shared/consts'
import { useFormContext } from 'react-hook-form'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { ProfileCardFormValues } from '@/features/Profile'
import { ApiError } from '@/shared/types'
import { SerializedError } from '@reduxjs/toolkit'

interface ProfileCardFormProps {
  disabled: boolean
  apiErrors: ApiError | SerializedError | undefined
}

export const ProfileCardForm = ({
  disabled,
  apiErrors,
}: ProfileCardFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProfileCardFormValues>()

  return (
    <form className={cls.profileCardForm} noValidate>
      <ApiErrorMessage error={apiErrors} />
      <label htmlFor="name" className={cls.profileCardForm__label}>
        {Placeholders.features.profile.cardForm.labels.name}
        <Input
          id={'name'}
          type={'text'}
          placeholder={Placeholders.features.profile.cardForm.placeholders.name}
          className={cls.profileCardForm__input}
          disabled={disabled}
          {...register('name')}
        />
        {errors.name && (
          <span className={cls.profileCardForm__errors}>
            {errors.name.message}
          </span>
        )}
      </label>
      <label htmlFor="email" className={cls.profileCardForm__label}>
        {Placeholders.features.profile.cardForm.labels.email}
        <Input
          id={'email'}
          type={'email'}
          placeholder={
            Placeholders.features.profile.cardForm.placeholders.email
          }
          className={cls.profileCardForm__input}
          disabled={disabled}
          {...register('email')}
        />
        {errors.email && (
          <span className={cls.profileCardForm__errors}>
            {errors.email.message}
          </span>
        )}
      </label>
      <label htmlFor="phone" className={cls.profileCardForm__label}>
        {Placeholders.features.profile.cardForm.labels.phone}
        <Input
          id={'phone'}
          type={'phone'}
          placeholder={
            Placeholders.features.profile.cardForm.placeholders.phone
          }
          className={cls.profileCardForm__input}
          disabled={disabled}
          {...register('phone')}
        />
        {errors.phone && (
          <span className={cls.profileCardForm__errors}>
            {errors.phone.message}
          </span>
        )}
      </label>
    </form>
  )
}
