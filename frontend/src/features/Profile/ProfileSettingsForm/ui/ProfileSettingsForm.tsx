import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { FormEvent, useCallback } from 'react'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components'
import cls from './ProfileSettingsForm.module.less'
import { PasswordInput } from '@/entities/User'
import { Button } from '@/shared/ui/Button'
import {
  profileSettingsActions,
  profileSettingsReducer,
} from '../model/slice/profileSettingsSlice'
import { getProfileSettingsState } from '@/features/Profile'
import { Placeholders } from '@/shared/consts'

const initialReducers: ReducerList = {
  profileSettingsForm: profileSettingsReducer,
}

export const ProfileSettingsForm = () => {
  const { currentPassword, newPassword, isLoading, error } = useAppSelector(
    getProfileSettingsState
  )
  const dispatch = useAppDispatch()

  const onChangeCurrentPassword = useCallback(
    (value: string) => {
      dispatch(profileSettingsActions.setCurrentPassword(value))
    },
    [dispatch]
  )

  const onChangeNewPassword = useCallback(
    (value: string) => {
      dispatch(profileSettingsActions.setNewPassword(value))
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // dispatch(changePassword({ currentPassword, newPassword }))
    },
    [dispatch, currentPassword, newPassword]
  )

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form className={cls.profileSettingsForm} onSubmit={handleSubmit}>
        <label
          htmlFor="current-password"
          className={cls.profileSettingsForm__label}
        >
          {Placeholders.features.profile.settingsForm.labels.currentPassword}
          <PasswordInput
            id={'current-password'}
            value={currentPassword}
            onChange={onChangeCurrentPassword}
            className={cls.profileSettingsForm__input}
          />
        </label>
        <label
          htmlFor="new-password"
          className={cls.profileSettingsForm__label}
        >
          {Placeholders.features.profile.settingsForm.labels.newPassword}
          <PasswordInput
            id={'new-password'}
            value={newPassword}
            onChange={onChangeNewPassword}
            className={cls.profileSettingsForm__input}
          />
        </label>
        <Button
          type="submit"
          disabled={isLoading}
          fullWidth={true}
          className={cls.profileSettingsForm__button}
        >
          {Placeholders.features.profile.settingsForm.submit}
        </Button>
        {error && (
          <span className={cls.profileSettingsForm__errors}>{error}</span>
        )}
      </form>
    </DynamicModuleLoader>
  )
}
