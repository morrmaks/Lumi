import cls from './OrderDetails.module.less'
import { Placeholders } from '@/shared/consts'
import {
  PaymentMethodsMap,
  PaymentStatus,
  PaymentStatusMap,
} from '@/entities/Order'
import { PaymentMethods } from '@/features/Order'

interface OrderDetailsProps {
  address: string
  paymentMethod: PaymentMethods
  paymentStatus: PaymentStatus
}

export const OrderDetails = ({
  address,
  paymentMethod,
  paymentStatus,
}: OrderDetailsProps) => {
  return (
    <div className={cls.orderDetails}>
      <h4 className={cls.orderDetails__title}>
        {Placeholders.entities.order.profileOrderModal.details.mainText}
      </h4>
      <div className={cls.orderDetails__container}>
        <div className={cls.orderDetails__address_container}>
          <h5 className={cls.orderDetails__address_title}>
            {Placeholders.entities.order.profileOrderModal.details.address}
          </h5>
          <p className={cls.orderDetails__address}>{address}</p>
        </div>
        <div className={cls.orderDetails__payment}>
          <h5 className={cls.orderDetails__payment_title}>
            {
              Placeholders.entities.order.profileOrderModal.details
                .orderPaymentText
            }
          </h5>
          <div className={cls.orderDetails__paymentContainers}>
            <div className={cls.orderDetails__paymentContainer}>
              <span className={cls.orderDetails__paymentContainer_title}>
                {
                  Placeholders.entities.order.profileOrderModal.details
                    .paymentMethod
                }
              </span>
              <div className={cls.orderDetails__payment_line}></div>
              <span className={cls.orderDetails__paymentContainer_method}>
                {PaymentMethodsMap[paymentMethod]}
              </span>
            </div>
            <div className={cls.orderDetails__paymentContainer}>
              <span className={cls.orderDetails__paymentContainer_title}>
                {
                  Placeholders.entities.order.profileOrderModal.details
                    .paymentStatus
                }
              </span>
              <div className={cls.orderDetails__payment_line}></div>
              <span className={cls.orderDetails__paymentContainer_method}>
                {PaymentStatusMap[paymentStatus]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
