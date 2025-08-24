import { useEffect } from 'react'
import cls from './ProfileSettingsForm.module.less'
import { PasswordInput } from '@/entities/User'
import { Button } from '@/shared/ui/Button'
import {
  profileSettingsFormSchema,
  ProfileSettingsFormValues,
} from '@/features/Profile'
import { Placeholders } from '@/shared/consts'
import { usePatchPasswordMutation } from '@/entities/User/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { Loader } from '@/shared/ui/Loader'

const initialFormState: ProfileSettingsFormValues = {
  currentPassword: '',
  newPassword: '',
}

export const ProfileSettingsForm = () => {
  const [updatePassword, { isSuccess, isLoading, error: changePasswordError }] =
    usePatchPasswordMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileSettingsFormValues>({
    resolver: zodResolver(profileSettingsFormSchema),
    defaultValues: initialFormState,
    mode: 'onChange',
  })

  useEffect(() => {
    if (isSuccess) {
      reset(initialFormState)
    }
  }, [isSuccess])

  const onSubmit = async (data: ProfileSettingsFormValues) => {
    try {
      await updatePassword(data).unwrap()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      className={cls.profileSettingsForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label
        htmlFor="current-password"
        className={cls.profileSettingsForm__label}
      >
        {Placeholders.features.profile.settingsForm.labels.currentPassword}
        <PasswordInput
          id={'current-password'}
          {...register('currentPassword')}
          disabled={isLoading}
        />
        {errors.currentPassword && (
          <span className={cls.profileSettingsForm__errors}>
            {errors.currentPassword.message}
          </span>
        )}
      </label>
      <label htmlFor="new-password" className={cls.profileSettingsForm__label}>
        {Placeholders.features.profile.settingsForm.labels.newPassword}
        <PasswordInput
          id={'new-password'}
          {...register('newPassword')}
          disabled={isLoading}
        />
        {errors.newPassword && (
          <span className={cls.profileSettingsForm__errors}>
            {errors.newPassword.message}
          </span>
        )}
      </label>
      <Button
        type="submit"
        disabled={isLoading}
        fullWidth={true}
        className={cls.profileSettingsForm__button}
      >
        {isLoading ? (
          <Loader delay={0} />
        ) : (
          Placeholders.features.profile.settingsForm.submit
        )}
      </Button>
      <ApiErrorMessage error={changePasswordError} />
    </form>
  )
}
