import cls from './ProfileSettings.module.less'
import { IconsMap } from '@/shared/consts/icons'
import { Icon } from '@/shared/ui/Icon'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { ProfileSettingsForm } from '@/features/Profile'
import { useCallback } from 'react'
import { useAppDispatch } from '@/shared/lib/hooks'
import { getRouteMain } from '@/shared/consts/router'
import { useNavigate } from 'react-router-dom'
import { SettingList } from '@/entities/Profile'

export const ProfileSettings = () => {
  // const notifications = useAppSelector()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleDeleteAccount = useCallback(() => {
    // dispatch(deleteAccount())
    const res = true
    if (res) {
      navigate(getRouteMain())
    }
  }, [dispatch])

  const handleOrderNotification = useCallback(() => {
    // const res = dispatch(logout())
  }, [dispatch])

  const handleMarketingNotification = useCallback(() => {
    // const res = dispatch(logout())
  }, [dispatch])

  const handleNewsNotification = useCallback(() => {
    // const res = dispatch(logout())
  }, [dispatch])

  return (
    <div className={cls.profileSettings}>
      <div className={cls.profileSettings__section}>
        <div className={cls.profileSettings__sectionHeader}>
          <Icon
            Svg={IconsMap.NOTICE}
            className={cls.profileSettings__sectionHeader_icon}
          />
          <h2 className={cls.profileSettings__sectionHeader_title}>
            Уведомления
          </h2>
        </div>
        <SettingList />
      </div>
      <div className={cls.profileSettings__section}>
        <div className={cls.profileSettings__sectionHeader}>
          <Icon
            Svg={IconsMap.SAFETY}
            className={cls.profileSettings__sectionHeader_icon}
          />
          <h2 className={cls.profileSettings__sectionHeader_title}>
            Безопасность
          </h2>
        </div>
        <div className={cls.profileSettings__formChangePassowrd}>
          <ProfileSettingsForm />
        </div>
        <div className={cls.profileSettings__deleteAccount}>
          <Button
            theme={ButtonTheme.DANGER}
            onClick={handleDeleteAccount}
            fullWidth={true}
          >
            Удалить аккаунт
          </Button>
          <p className={cls.profileSettings__deleteAccount_textWarning}>
            Это действие необратимо. Все ваши данные будут удалены.
          </p>
        </div>
      </div>
    </div>
  )
}
