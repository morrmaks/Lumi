import cls from './PaymentSuccessPage.module.less'
import { getRouteMain, Placeholders } from '@/shared/consts'
import { PageLayout } from '@/widgets/PageLayout'
import { OrderForm, useGetOrderValidateQuery } from '@/features/Order'
import { Loader } from '@/shared/ui/Loader'
import { skipToken } from '@reduxjs/toolkit/query'
import { Navigate } from 'react-router-dom'

const PaymentSuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const orderId = searchParams.get('orderId')
  const { data, isLoading } = useGetOrderValidateQuery(orderId ?? skipToken)

  if (isLoading) return <Loader />

  if (!isLoading && !data?.success) return <Navigate to={getRouteMain()} />

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

export default PaymentSuccessPage
