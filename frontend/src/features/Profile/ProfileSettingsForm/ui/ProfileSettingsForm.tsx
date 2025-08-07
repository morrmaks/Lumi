import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { FormEvent, useCallback } from 'react'
import { DynamicModuleLoader } from '@/shared/lib/components'
import cls from './ProfileSettingsForm.module.less'
import { PasswordInput } from '@/entities/User'
import { Button } from '@/shared/ui/Button'
import {
  profileSettingsActions,
  profileSettingsReducer,
} from '../model/slice/profileSettingsSlice'
import { getProfileSettingsState } from '../model/selectors/getProfileSettingsState'

const initialReducers = {
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
          Текущий пароль
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
          Новый пароль
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
          Изменить пароль
        </Button>
        {error && (
          <span className={cls.profileSettingsForm__errors}>{error}</span>
        )}
      </form>
    </DynamicModuleLoader>
  )
}
