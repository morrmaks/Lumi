import cls from './ProfileCard.module.less'
import { useAppSelector } from '@/shared/lib/hooks'
import { getUserData } from '@/entities/User'
import { getWishlistProducts } from '@/features/Wishlist'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useState } from 'react'
import {
  ProfileCardForm,
  profileCardFormSchema,
  ProfileCardFormValues,
} from '@/features/Profile/ProfileCardForm'
import { Placeholders } from '@/shared/consts'
import { useGetOrdersCountQuery, usePatchMeMutation } from '@/entities/User/api'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileAvatar } from '@/features/Profile'
import { Loader } from '@/shared/ui/Loader'

export const ProfileCard = () => {
  const { name, email, phone, ordersCount } = useAppSelector(getUserData)
  const wishlistProducts = useAppSelector(getWishlistProducts)

  const [editForm, setEditForm] = useState<boolean>(false)
  const [
    profileCardUser,
    { isLoading: profileCardIsLoading, error: profileCardError },
  ] = usePatchMeMutation()

  const methods = useForm<ProfileCardFormValues>({
    resolver: zodResolver(profileCardFormSchema),
    defaultValues: {
      name: name || '',
      email: email || '',
      phone: phone || '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: ProfileCardFormValues) => {
    try {
      await profileCardUser(data).unwrap()
      setEditForm(false)
    } catch (e) {
      console.error(e)
    }
  }

  const handleEditForm = async () => {
    if (editForm) {
      await methods.handleSubmit(onSubmit)()
    } else {
      setEditForm(true)
    }
  }

  return (
    <div className={cls.profileCard}>
      <div className={cls.profileCard__personalInfo}>
        <div className={cls.profileCard__userHeader}>
          <ProfileAvatar />
          <span className={cls.profileCard__username}>{name}</span>
          <span className={cls.profileCard__email}>{email}</span>
        </div>
        <div className={cls.profileCard__userStats}>
          <div className={cls.profileCard__orders}>
            <span>{Placeholders.entities.profile.card.ordersQuantity}</span>
            <span className={cls.profileCard__orders_total}>
              {ordersCount ?? 0}
            </span>
          </div>
          <div className={cls.profileCard__wishlistProducts}>
            <span>{Placeholders.entities.profile.card.wishlistQuantity}</span>
            <span className={cls.profileCard__wishlistProducts_total}>
              {wishlistProducts.length ?? 0}
            </span>
          </div>
        </div>
      </div>
      <div className={cls.profileCard__personalInfo}>
        <div className={cls.profileCard__form_header}>
          <h2 className={cls.profileCard__form_headerTitle}>
            {Placeholders.entities.profile.card.personalInfo}
          </h2>
          <Button
            theme={ButtonTheme.SECONDARY}
            onClick={handleEditForm}
            disabled={profileCardIsLoading}
          >
            {editForm ? (
              profileCardIsLoading ? (
                <Loader delay={0} />
              ) : (
                Placeholders.entities.profile.card.onSaveInfo
              )
            ) : (
              Placeholders.entities.profile.card.onEditInfo
            )}
          </Button>
        </div>
        <FormProvider {...methods}>
          <ProfileCardForm
            apiErrors={profileCardError}
            disabled={!editForm || profileCardIsLoading}
          />
        </FormProvider>
      </div>
    </div>
  )
}
