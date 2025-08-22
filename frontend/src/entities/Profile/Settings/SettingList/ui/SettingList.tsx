import { Button } from '@/shared/ui/Button'
import cls from './SettingList.module.less'
import { Checkbox, CheckboxType } from '@/shared/ui/Checkbox'
import { settingListConfig } from '@/entities/Profile'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { getUserData } from '@/entities/User'
import { useCallback, useState } from 'react'
import { Settings } from '@/entities/User'
import { Placeholders } from '@/shared/consts'
import { usePatchSettingsMutation } from '@/entities/User/api'
import { Loader } from '@/shared/ui/Loader'

export const SettingList = () => {
  const dispatch = useAppDispatch()
  const { settings } = useAppSelector(getUserData)
  const [setUserSettings, { isLoading }] = usePatchSettingsMutation()
  const [changeableSettings, setChangeableSettings] = useState<Settings>(
    settings ?? {
      orderNotifications: false,
      marketingNotifications: false,
      newsNotifications: false,
    }
  )

  const handleSettingStatus = useCallback(
    (newChecked: boolean, name: keyof Settings) => {
      setChangeableSettings((prev) => ({
        ...prev,
        [name]: newChecked,
      }))
    },
    []
  )

  const handleSaveSettings = useCallback(async () => {
    await setUserSettings(changeableSettings)
  }, [changeableSettings])

  return (
    <div className={cls.settingList__container}>
      <ul className={cls.settingList}>
        {settingListConfig.map(({ title, description, name }) => (
          <li className={cls.settingList__setting} key={title}>
            <div className={cls.settingList__setting_info}>
              <h3 className={cls.settingList__setting_title}>{title}</h3>
              <p className={cls.settingList__setting_description}>
                {description}
              </p>
            </div>
            <Checkbox
              checked={changeableSettings[name]}
              onChange={(newChecked) => handleSettingStatus(newChecked, name)}
              checkboxType={CheckboxType.TOGGLE}
              className={cls.settingList__setting_checkbox}
            />
          </li>
        ))}
      </ul>
      <Button disabled={isLoading} onClick={handleSaveSettings}>
        {isLoading ? (
          <Loader delay={0} />
        ) : (
          Placeholders.entities.profile.settings.notifications.onSave
        )}
      </Button>
    </div>
  )
}
