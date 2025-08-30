import cls from './OrderCard.module.less'
import { IOrder } from '@/features/Order'
import { useState } from 'react'
import { OrderStatusMap, ProfileOrderModal } from '@/entities/Order'
import { Placeholders } from '@/shared/consts'
import { classNames, formattedDate } from '@/shared/lib/utils'

export interface OrderCardProps {
  card: IOrder
}

export const OrderCard = ({ card }: OrderCardProps) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const { orderNumber, total, status, date, products } = card

  function handleModalClose() {
    setShowModal(false)
  }

  return (
    <>
      <div className={cls.orderCard} onClick={() => setShowModal(true)}>
        <div className={cls.orderCard__status_container}>
          <span
            className={classNames(cls.orderCard__statusIcon, {}, [
              cls[`orderCard__statusIcon_${status}`],
            ])}
          ></span>
          <span className={cls.orderCard__status}>
            {OrderStatusMap[status]}
          </span>
        </div>
        <div className={cls.orderCard__info}>
          <div className={cls.orderCard__meta}>
            <p className={cls.orderCard__title}>
              {`${Placeholders.entities.order.card.mainText} ${orderNumber}`}
            </p>
            <p
              className={cls.orderCard__date}
            >{`${formattedDate(date)} • ${products.length} шт`}</p>
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
