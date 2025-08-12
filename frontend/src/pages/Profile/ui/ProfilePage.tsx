import { PageLayout } from '@/widgets/PageLayout'
import cls from './ProfilePage.module.less'
import { ProfilePageTabsConfig } from '../config/ProfilePageTabs'
import { ProfilePageTabs } from '@/pages/Profile'
import { classNames } from '@/shared/lib/utils'
import { useCallback, useState } from 'react'
import { ProfilePageTabContentMap } from '../consts'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { IconsMap } from '@/shared/consts/icons'
import { Icon } from '@/shared/ui/Icon'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useNavigate } from 'react-router-dom'
import { getRouteMain } from '@/shared/consts/router'

const ProfilePage = () => {
  const [tab, setTab] = useState<ProfilePageTabs>(ProfilePageTabs.PROFILE)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    // const res = dispatch(logout())
    const res = true
    if (res) {
      navigate(getRouteMain())
    }
  }, [dispatch])

  return (
    <PageLayout>
      <div className={cls.profilePage}>
        <div className={cls.profilePage__header}>
          <div className={cls.profilePage__header_container}>
            <h1 className={cls.profilePage__header_title}>Личный кабинет</h1>
            <p className={cls.profilePage__header_description}>
              Управляйте своим профилем и заказами
            </p>
          </div>
          <Button
            theme={ButtonTheme.OUTLINE}
            onClick={handleLogout}
            className={cls.profilePage__logoutButton}
          >
            <Icon
              Svg={IconsMap.LOGOUT}
              className={cls.profilePage__logoutButton_icon}
            />
            Выйти
          </Button>
        </div>
        <ul className={cls.profilePage__tabs}>
          {ProfilePageTabsConfig.map(({ label }) => (
            <li
              key={label}
              className={classNames(cls.profilePage__tab, {
                [cls.profilePage__tab_active]: tab === label,
              })}
              onClick={() => setTab(label)}
            >
              {label}
            </li>
          ))}
        </ul>
        <div className={cls.profilePage__content}>
          {ProfilePageTabContentMap[tab]}
        </div>
      </div>
    </PageLayout>
  )
}

export default ProfilePage
