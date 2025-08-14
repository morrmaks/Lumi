import { Button } from '@/shared/ui/Button'
import cls from './SettingList.module.less'
import { Checkbox, CheckboxType } from '@/shared/ui/Checkbox'
import { settingListConfig } from '@/entities/Profile'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { getUserSettings } from '@/entities/User'
import { useCallback, useEffect, useState } from 'react'
import { Settings, userActions } from '@/entities/User'
import { Placeholders } from '@/shared/consts'

export const SettingList = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    //данные о настройках будут получаться через запрос к серверу
    dispatch(
      userActions.setSettings({
        orderNotifications: true,
        marketingNotifications: false,
        newsNotifications: false,
      })
    )
  }, [])
  const settings = useAppSelector(getUserSettings)

  const handleSettingStatus = useCallback(
    (newChecked: boolean, name: keyof Settings) => {
      dispatch(
        userActions.setSetting({ name, value: newChecked ? true : false })
      )
    },
    []
  )

  const handleSaveSettings = useCallback(async () => {
    setIsLoading(true)
    // await dispatch(saveSettings(settings))
    setIsLoading(false)
  }, [dispatch, settings])

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
              checked={settings[name]}
              onChange={(newChecked) => handleSettingStatus(newChecked, name)}
              checkboxType={CheckboxType.TOGGLE}
              className={cls.settingList__setting_checkbox}
            />
          </li>
        ))}
      </ul>
      <Button disabled={isLoading} onClick={handleSaveSettings}>
        {Placeholders.entities.profile.settings.notifications.onSave}
      </Button>
    </div>
  )
}
