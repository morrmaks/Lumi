import cls from './ProfileOrders.module.less'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useState } from 'react'
import { OrderCard } from '@/entities/Order'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Placeholders } from '@/shared/consts'
import { ProfileEmptyOrders, ProfileOrdersSkeleton } from '@/entities/Profile'
import { useGetOrdersQuery } from '@/features/Order'

export const ProfileOrders = () => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const { data: orders, isLoading } = useGetOrdersQuery()

  const profileEmptyOrdersVisible = Boolean(!orders?.length && !isLoading)
  const showMoreButtonVisible = Boolean(orders?.length && orders.length > 3)
  const displayedOrders = (showAll ? orders : orders?.slice(0, 3)) || []

  return (
    <div className={cls.profileOrders}>
      <div className={cls.profileOrders__header}>
        <Icon
          Svg={IconsMap.ORDERS}
          className={cls.profileOrders__header_icon}
        />
        <h2 className={cls.profileOrders__header_title}>
          {Placeholders.entities.profile.orders.mainText}
        </h2>
      </div>

      {isLoading && <ProfileOrdersSkeleton />}

      {profileEmptyOrdersVisible && <ProfileEmptyOrders />}

      <ul className={cls.profileOrders__list}>
        {displayedOrders.map((card) => (
          <li key={card.id} className={cls.profileOrders__order}>
            <OrderCard card={card} />
          </li>
        ))}
      </ul>
      {showMoreButtonVisible && (
        <Button
          onClick={() => setShowAll(true)}
          theme={ButtonTheme.OUTLINE}
          className={cls.profileOrders__button}
        >
          {Placeholders.entities.profile.orders.onShowAllOrders}
        </Button>
      )}
    </div>
  )
}
