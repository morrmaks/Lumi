import { PageLayout } from '@/widgets/PageLayout'
import cls from './ProfilePage.module.less'
import { ProfilePageTabsConfig } from '../config/ProfilePageTabs'
import { ProfilePageTabs } from '@/pages/Profile'
import { classNames } from '@/shared/lib/utils'
import { useState } from 'react'
import { ProfilePageTabContentMap } from '../consts'
import { Placeholders } from '@/shared/consts'
import { useGetOrdersCountQuery } from '@/entities/User/api'

const ProfilePage = () => {
  const [tab, setTab] = useState<ProfilePageTabs>(ProfilePageTabs.PROFILE)
  useGetOrdersCountQuery()

  return (
    <PageLayout>
      <div className={cls.profilePage}>
        <div className={cls.profilePage__header}>
          <div className={cls.profilePage__header_container}>
            <h2 className={cls.profilePage__header_title}>
              {Placeholders.pages.profile.mainText}
            </h2>
            <p className={cls.profilePage__header_description}>
              {Placeholders.pages.profile.describeText}
            </p>
          </div>
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
