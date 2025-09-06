import cls from './OrderPage.module.less'
import { getRouteAuth, Placeholders } from '@/shared/consts'
import { PageLayout } from '@/widgets/PageLayout'
import { getIsFromOrderLink, OrderForm } from '@/features/Order'
import { useAppSelector } from '@/shared/lib/hooks'
import { Navigate } from 'react-router-dom'
import { Seo } from '@/shared/lib/components'

const OrderPage = () => {
  const isFromOrderLink = useAppSelector(getIsFromOrderLink)

  if (!isFromOrderLink) return <Navigate to={getRouteAuth()} />

  return (
    <PageLayout>
      <Seo title="Мой заказ" />
      <div className={cls.orderPage}>
        <div className={cls.orderPage__header}>
          <h2 className={cls.orderPage__title}>
            {Placeholders.pages.order.mainText}
          </h2>
          <p className={cls.orderPage__description}>
            {Placeholders.pages.order.describeText}
          </p>
        </div>
        <div className={cls.orderPage__form}>
          <h3 className={cls.orderPage__form_title}>
            {Placeholders.pages.order.formTitle}
          </h3>
          <OrderForm />
        </div>
      </div>
    </PageLayout>
  )
}

export default OrderPage
