import cls from './PaymentSuccessPayInfo.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap, Placeholders } from '@/shared/consts'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { PaymentMethods } from '@/features/Order'
import { useCallback } from 'react'
import { PaymentMethodsMap } from '@/entities/Order'

interface PaymentSuccessPayInfoProps {
  paymentMethod: PaymentMethods | undefined
  paymentUrl: string
}

export const PaymentSuccessPayInfo = ({
  paymentMethod,
  paymentUrl,
}: PaymentSuccessPayInfoProps) => {
  const handlePayment = useCallback(() => {
    window.location.href = paymentUrl
  }, [paymentUrl])

  return (
    <div className={cls.paymentSuccessPayInfo}>
      <div className={cls.paymentSuccessPayInfo__title_container}>
        <Icon
          Svg={IconsMap.PAYMENT}
          className={cls.paymentSuccessPayInfo__icon}
        />
        <h3 className={cls.paymentSuccessPayInfo__title}>
          {Placeholders.pages.paymentSuccess.paymentInfo.mainText}
        </h3>
      </div>
      {paymentMethod && (
        <p className={cls.paymentSuccessPayInfo__method}>
          {PaymentMethodsMap[paymentMethod]}
        </p>
      )}
      <p className={cls.paymentSuccessPayInfo__description}>
        {Placeholders.pages.paymentSuccess.paymentInfo.describeText}
      </p>
      <Button
        theme={ButtonTheme.SECONDARY}
        className={cls.paymentSuccessPayInfo__button}
        onClick={handlePayment}
      >
        <Icon
          Svg={IconsMap.PAYMENT}
          className={cls.paymentSuccessPayInfo__buttonIcon}
        />
        {Placeholders.pages.paymentSuccess.paymentInfo.buttonText}
      </Button>
    </div>
  )
}
