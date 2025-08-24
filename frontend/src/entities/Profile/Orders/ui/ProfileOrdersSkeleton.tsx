import cls from './ProfileOrders.module.less'
import { OrderCardSkeleton } from '@/entities/Order'

export const ProfileOrdersSkeleton = () => {
  return (
    <ul className={cls.profileOrders__list}>
      {[...new Array(3)].map((_, i) => (
        <OrderCardSkeleton key={i} />
      ))}
    </ul>
  )
}
