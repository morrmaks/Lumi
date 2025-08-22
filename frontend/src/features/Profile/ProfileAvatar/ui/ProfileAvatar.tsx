import cls from './ProfileAvatar.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { Input } from '@/shared/ui/Input'
import { useCallback } from 'react'
import { usePatchAvatarMutation } from '@/entities/User/api'
import { useAppSelector } from '@/shared/lib/hooks'
import { getUserData } from '@/entities/User'
import { fullImageUrl } from '@/shared/lib/utils'

export const ProfileAvatar = () => {
  const [setAvatar, { isLoading }] = usePatchAvatarMutation()
  const { name, avatarUrl } = useAppSelector(getUserData)

  const handleChangeAvatar = useCallback(async (file: string | File | null) => {
    if (!file) return
    const formData = new FormData()
    formData.append('avatar', file as File)
    try {
      await setAvatar(formData).unwrap()
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <div>
      <label htmlFor="avatar-upload">
        <AppImage
          src={fullImageUrl(avatarUrl ?? '')}
          alt={`avatar ${name}`}
          className={cls.profileAvatar__label}
        />
      </label>
      <Input
        id={'avatar-upload'}
        name={'avatar'}
        type={'file'}
        className={cls.profileAvatar__input}
        onChangeFile={handleChangeAvatar}
      />
    </div>
  )
}
