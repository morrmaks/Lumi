import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { FormEvent, useCallback, useEffect } from 'react'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components'
import cls from './ProfileCardForm.module.less'
import { Input } from '@/shared/ui/Input'
import { getUserAuthData } from '@/entities/User'
import {
  getProfileCardState,
  profileCardActions,
  profileCardReducer,
} from '@/features/Profile/ProfileCardForm'

interface ProfileCardFormProps {
  disabled: boolean
}

const initialReducers: ReducerList = {
  profileCardForm: profileCardReducer,
}

export const ProfileCardForm = ({ disabled }: ProfileCardFormProps) => {
  const userData = useAppSelector(getUserAuthData)
  const { username, email, phone, error } = useAppSelector(getProfileCardState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      profileCardActions.setForm({
        username: userData.username,
        email: userData.email,
        phone: userData.phone,
      })
    )
  }, [])

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(profileCardActions.setUsername(value))
    },
    [dispatch]
  )

  const onChangeEmail = useCallback(
    (value: string) => {
      dispatch(profileCardActions.setEmail(value))
    },
    [dispatch]
  )

  const onChangePhone = useCallback(
    (value: string) => {
      dispatch(profileCardActions.setPhone(value))
    },
    [dispatch]
  )

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      // dispatch(updateUserData({ username, email, phone }))
    },
    [dispatch, username, email, phone]
  )

  return (
    <DynamicModuleLoader reducers={initialReducers}>
      <form className={cls.profileCardForm} onSubmit={handleSubmit}>
        {error && (
          <span className={cls.profileCardForm__errors}>
            {error}
            sdfsdf
          </span>
        )}
        <label htmlFor="username" className={cls.profileCardForm__label}>
          Имя
          <Input
            id={'username'}
            type={'text'}
            value={username}
            onChangeString={onChangeUsername}
            placeholder={'Ваше имя'}
            className={cls.profileCardForm__input}
            disabled={disabled}
          />
        </label>
        <label htmlFor="email" className={cls.profileCardForm__label}>
          Email
          <Input
            id={'email'}
            type={'email'}
            value={email}
            onChangeString={onChangeEmail}
            placeholder={'email@mail.com'}
            className={cls.profileCardForm__input}
            disabled={disabled}
          />
        </label>
        <label htmlFor="phone" className={cls.profileCardForm__label}>
          Телефон
          <Input
            id={'phone'}
            type={'phone'}
            value={phone}
            onChangeString={onChangePhone}
            placeholder={'+7 (992) 234 12 34'}
            className={cls.profileCardForm__input}
            disabled={disabled}
          />
        </label>
      </form>
    </DynamicModuleLoader>
  )
}
