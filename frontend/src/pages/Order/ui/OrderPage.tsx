import cls from './OrderPage.module.less'
import { Placeholders } from '@/shared/consts'
import { PageLayout } from '@/widgets/PageLayout'
import { OrderForm } from '@/features/Order'
import { getUserIsAuth } from '@/entities/User'
import { useAppSelector } from '@/shared/lib/hooks'

const OrderPage = () => {
  const isAuth = useAppSelector(getUserIsAuth)

  // if (!isAuth) return <Navigate to={getRouteAuth()}/>

  return (
    <PageLayout>
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
