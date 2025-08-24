import cls from './PaymentSuccessNextSteps.module.less'
import { Placeholders } from '@/shared/consts'
import { NextStepsConfig } from '@/pages/PaymentSuccess'

export const PaymentSuccessNextSteps = () => {
  return (
    <div className={cls.paymentSuccessNextSteps__container}>
      <h3>{Placeholders.pages.paymentSuccess.nextSteps.mainText}</h3>
      <ul className={cls.paymentSuccessNextSteps}>
        {NextStepsConfig.map(({ number, title, description }) => (
          <li className={cls.paymentSuccessNextSteps__step} key={number}>
            <div className={cls.paymentSuccessNextSteps__step_number}>
              {number}
            </div>
            <h4 className={cls.paymentSuccessNextSteps__step_title}>{title}</h4>
            <p className={cls.paymentSuccessNextSteps__step_description}>
              {description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}