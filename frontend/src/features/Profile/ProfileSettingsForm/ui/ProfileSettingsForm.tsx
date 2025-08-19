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
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'

const initialFormState: ProfileSettingsFormValues = {
  currentPassword: '',
  newPassword: '',
}

export const ProfileSettingsForm = () => {
  const [updatePassword, { isSuccess, isLoading, error: changePasswordError }] =
    usePatchPasswordMutation()
  const navigate = useNavigate()
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
          className={cls.profileSettingsForm__input}
          {...register('currentPassword')}
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
          className={cls.profileSettingsForm__input}
          {...register('newPassword')}
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
        {Placeholders.features.profile.settingsForm.submit}
      </Button>
      <ApiErrorMessage error={changePasswordError} />
    </form>
  )
}
