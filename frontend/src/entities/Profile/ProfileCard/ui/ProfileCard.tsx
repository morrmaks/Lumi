import cls from './ProfileCard.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { getUserAuthData, userActions } from '@/entities/User'
import { getWishlistProductsState } from '@/features/Wishlist'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '@/shared/ui/Input'
import {
  getProfileCardState,
  ProfileCardForm,
} from '@/features/Profile/ProfileCardForm'
import { Placeholders } from '@/shared/consts'

export const ProfileCard = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      userActions.setAuthData({
        id: '123',
        username: 'Максим Морозов',
        email: 'morozov.maksm20@yandex.ru',
        phone: '123123',
        avatar:
          'https://plus.unsplash.com/premium_photo-1669700572184-edbb6d28b452?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        isActivated: false,
        orders: [
          {
            id: '123412341',
            total: 2134,
            status: 'Получен',
            date: '5.08.2024',
            products: [
              { id: '2', quantity: 1 },
              { id: '1', quantity: 1 },
            ],
            trackNumber: '213412341',
            address: 'Москва, ул. Тверская 16, 4кв',
            paymentMethod: 'Банковская карта',
          },
          {
            id: '13412342',
            total: 71345,
            status: 'Оформлен',
            date: '13.06.2025',
            products: [
              { id: '2', quantity: 1 },
              { id: '1', quantity: 1 },
            ],
            trackNumber: '134123412',
            address: 'Москва, ул. Тверская 16, 4кв',
            paymentMethod: 'Банковская карта',
          },
          {
            id: '2134133',
            total: 31345,
            status: 'В пути',
            date: '26.09.2024',
            products: [
              { id: '2', quantity: 1 },
              { id: '1', quantity: 1 },
              { id: '5', quantity: 1 },
            ],
            trackNumber: '213423413',
            address: 'Москва, ул. Тверская 16, 4кв',
            paymentMethod: 'Банковская карта',
          },
          {
            id: '123412344',
            total: 102345,
            status: 'Собран',
            date: '14.12.2024',
            products: [
              { id: '2', quantity: 1 },
              { id: '1', quantity: 1 },
              { id: '4', quantity: 1 },
            ],
            trackNumber: '123412342344',
            address: 'Москва, ул. Тверская 16, 4кв',
            paymentMethod: 'Банковская карта',
          },
          {
            id: '1341345',
            total: 51345,
            status: 'Доставлен',
            date: '6.04.2025',
            products: [
              { id: '2', quantity: 1 },
              { id: '1', quantity: 1 },
              { id: '3', quantity: 1 },
              { id: '5', quantity: 1 },
            ],
            trackNumber: '232342345',
            address: 'Москва, ул. Тверская 16, 4кв',
            paymentMethod: 'Банковская карта',
          },
        ],
      })
    )
  }, [])

  const [editForm, setEditForm] = useState<boolean>(false)
  const { id, username, email, phone, avatar, orders } =
    useAppSelector(getUserAuthData)
  const profileForm = useAppSelector(getProfileCardState)
  const { products } = useAppSelector(getWishlistProductsState)

  const handleChangeAvatar = useCallback(
    (file: string | File | null) => {
      if (file instanceof File) {
        // // dispatch(updateAvatar(file)) //запрос на сервер, после которого возвращаются все данные пользователя, включая ссылку на аватар
      }
    },
    [dispatch]
  )

  const handleEditForm = useCallback(() => {
    if (editForm) {
      // dispatch(updateUserData({
      //   username: profileForm.username,
      //   email: profileForm.email,
      //   phone: profileForm.phone,
      // }))  //запрос на сервер, после которого возвращаются все данные пользователя, включая ссылку на аватар
    }

    setEditForm(!editForm)
  }, [
    dispatch,
    editForm,
    profileForm.username,
    profileForm.email,
    profileForm.phone,
  ])

  return (
    <div className={cls.profileCard}>
      <div className={cls.profileCard__personalInfo}>
        <div className={cls.profileCard__userHeader}>
          <label htmlFor="avatar-upload">
            <AppImage
              src={avatar}
              alt={`avatar ${username}`}
              className={cls.profileCard__avatar}
            />
          </label>
          <Input
            id={'avatar-upload'}
            type={'file'}
            className={cls.profileCard__avatar_input}
            onChangeFile={handleChangeAvatar}
          />
          <span className={cls.profileCard__username}>{username}</span>
          <span className={cls.profileCard__email}>{email}</span>
        </div>
        <div className={cls.profileCard__userStats}>
          <div className={cls.profileCard__orders}>
            <span>{Placeholders.entities.profile.card.ordersQuantity}</span>
            <span className={cls.profileCard__orders_total}>
              {orders.length}
            </span>
          </div>
          <div className={cls.profileCard__wishlistProducts}>
            <span>{Placeholders.entities.profile.card.wishlistQuantity}</span>
            <span className={cls.profileCard__wishlistProducts_total}>
              {products.length}
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
            disabled={profileForm.isLoading}
          >
            {editForm
              ? Placeholders.entities.profile.card.onSaveInfo
              : Placeholders.entities.profile.card.onEditInfo}
          </Button>
        </div>
        <ProfileCardForm disabled={!editForm} />
      </div>
    </div>
  )
}
