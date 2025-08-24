import cls from './PaymentSuccessHeader.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap, Placeholders } from '@/shared/consts'
import { copyToClipboard } from '@/shared/lib/utils'

interface PaymentSuccessHeaderProps {
  orderNumber: string
  isPaid: boolean
}

export const PaymentSuccessHeader = ({
  orderNumber,
  isPaid,
}: PaymentSuccessHeaderProps) => {
  const texts = isPaid
    ? Placeholders.pages.paymentSuccess.paidOrder
    : Placeholders.pages.paymentSuccess.createdOrder

  return (
    <div className={cls.paymentSuccessHeader}>
      <Icon
        Svg={IconsMap.SUCCESS}
        className={cls.paymentSuccessHeader__icon_success}
      />
      <h2 className={cls.paymentSuccessHeader__title}>
        {texts.mainText}
      </h2>
      <p className={cls.paymentSuccessHeader__description}>
        {texts.describeText}
      </p>
      <div className={cls.paymentSuccessHeader__orderNumber_container}>
        <Icon
          Svg={IconsMap.ORDERS}
          className={cls.paymentSuccessHeader__icon_orderNumber}
        />
        <p className={cls.paymentSuccessHeader__orderNumber_text}>
          {Placeholders.pages.paymentSuccess.orderNumberText}
        </p>
        <div className={cls.paymentSuccessHeader__orderNumber}>
          <p>{orderNumber}</p>
          <Icon
            Svg={IconsMap.COPY}
            className={cls.paymentSuccessHeader__icon_copy}
            onClick={() => copyToClipboard(orderNumber)}
          />
        </div>
      </div>
    </div>
  )
}