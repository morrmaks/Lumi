import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Modal } from '@/shared/ui/Modal'
import {
  IOrder,
  useGetOrderProductsQuery,
  usePayOrderMutation,
} from '@/features/Order'
import cls from './ProfileOrderModal.module.less'
import {
  OrderDetails,
  OrderProducts,
  OrderStatusSection,
  PaymentStatus,
} from '@/entities/Order'
import { Placeholders } from '@/shared/consts'
import { Button } from '@/shared/ui/Button'
import { useCallback } from 'react'
import { Loader } from '@/shared/ui/Loader'

interface OrderModalProps {
  onClose: () => void
  card: IOrder
}

export const ProfileOrderModal = ({ onClose, card }: OrderModalProps) => {
  const {
    id,
    orderNumber,
    total,
    status,
    date,
    products,
    trackNumber,
    address,
    paymentMethod,
    paymentStatus,
  } = card
  const { data: productList, isLoading } = useGetOrderProductsQuery(id, {
    skip: products.length === 0,
  })
  const [payOrder, { isLoading: isLoadingPayOrder }] = usePayOrderMutation()

  const handlePaymentOrder = useCallback(async () => {
    const paymentLink = await payOrder(id).unwrap()
    window.location.href = paymentLink
  }, [id])

  return (
    <Modal onClose={onClose}>
      <div className={cls.profileOrderModal}>
        <div className={cls.profileOrderModal__header}>
          <Icon
            Svg={IconsMap.ORDERS}
            className={cls.profileOrderModal__header_icon}
          />
          <h3
            className={cls.profileOrderModal__header_title}
          >{`${Placeholders.entities.order.profileOrderModal.mainText} ${orderNumber}`}</h3>
        </div>
        <OrderStatusSection
          status={status}
          date={date}
          trackNumber={trackNumber}
        />
        <OrderProducts
          productList={productList}
          isLoading={isLoading}
          products={products}
        />
        <OrderDetails
          address={address}
          paymentStatus={paymentStatus}
          paymentMethod={paymentMethod}
        />
        <div className={cls.profileOrderModal__sectionTotalPrice}>
          <div className={cls.profileOrderModal__sectionTotalPrice_container}>
            <span className={cls.profileOrderModal__sectionTotalPrice_title}>
              {Placeholders.entities.order.profileOrderModal.details.totalPrice}
            </span>
            <span className={cls.profileOrderModal__orderPrice}>{total} ₽</span>
          </div>
          {paymentStatus === PaymentStatus.PENDING && (
            <Button
              className={cls.profileOrderModal__orderPayment}
              onClick={handlePaymentOrder}
              disabled={isLoadingPayOrder}
            >
              {isLoadingPayOrder ? (
                <Loader />
              ) : (
                Placeholders.entities.order.profileOrderModal.onPayment
              )}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}
