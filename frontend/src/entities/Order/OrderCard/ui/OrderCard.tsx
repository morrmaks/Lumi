import cls from './OrderCard.module.less'
import { IOrder } from '@/features/Order'
import { useState } from 'react'
import { ProfileOrderModal } from '@/entities/Order'

interface OrderCardProps {
  card: IOrder
}

export const OrderCard = ({ card }: OrderCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { id, total, status, date, products } = card

  function handleModalClose() {
    setShowModal(false)
  }

  return (
    <>
      <div className={cls.orderCard} onClick={() => setShowModal(true)}>
        <span className={cls.orderCard__status}>{status}</span>
        <div className={cls.orderCard__info}>
          <div className={cls.orderCard__meta}>
            <p className={cls.orderCard__title}>{`Заказ ${id}`}</p>
            <p
              className={cls.orderCard__date}
            >{`${date} • ${products.length} шт`}</p>
          </div>
          <span className={cls.orderCard__totalPrice}>{total} ₽</span>
        </div>
      </div>
      {showModal && (
        <ProfileOrderModal onClose={handleModalClose} card={card} />
      )}
    </>
  )
}
