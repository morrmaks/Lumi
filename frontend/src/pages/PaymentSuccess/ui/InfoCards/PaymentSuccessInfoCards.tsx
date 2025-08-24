import cls from './PaymentSuccessInfoCards.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts'
import { InfoCardsConfig } from '@/pages/PaymentSuccess'
import { classNames } from '@/shared/lib/utils'

export const PaymentSuccessInfoCards = () => {
  return (
    <ul className={cls.paymentSuccessInfoCards}>
      {InfoCardsConfig.map(({ icon, name, title, description }) => (
        <li
          key={title}
          className={classNames(cls.paymentSuccessInfoCards__card, {}, [
            cls[`paymentSuccessInfoCards__card_${name}`],
          ])}
        >
          <Icon
            Svg={IconsMap[icon]}
            className={classNames(cls.paymentSuccessInfoCards__cardIcon, {}, [
              cls[`paymentSuccessInfoCards__cardIcon_${name}`],
            ])}
          />
          <h3 className={cls.paymentSuccessInfoCards__card_title}>{title}</h3>
          <p className={cls.paymentSuccessInfoCards__card_description}>
            {description}
          </p>
        </li>
      ))}
    </ul>
  )
}
