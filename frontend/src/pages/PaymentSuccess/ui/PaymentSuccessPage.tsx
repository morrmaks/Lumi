import cls from './PaymentSuccessPage.module.less'
import { getRouteMain } from '@/shared/consts'
import { PageLayout } from '@/widgets/PageLayout'
import { PaymentMethods, useGetOrderValidateQuery } from '@/features/Order'
import { Loader } from '@/shared/ui/Loader'
import { skipToken } from '@reduxjs/toolkit/query'
import { Navigate } from 'react-router-dom'
import { PaymentSuccessHeader } from './Header'
import {
  PaymentSuccessInfoCards,
  PaymentSuccessNextSteps,
  PaymentSuccessPayInfo,
} from '@/pages/PaymentSuccess'
import { OrderStatus, PaymentStatus } from '@/entities/Order'

const PaymentSuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search)
  const orderId = searchParams.get('orderId')
  const { data, isLoading } = useGetOrderValidateQuery(orderId ?? skipToken)

  if (isLoading) return <Loader />

  if (!isLoading && !data?.orderNumber) return <Navigate to={getRouteMain()} />

  const showPaymentSection =
    data?.paymentMethod === PaymentMethods.CASH ||
    data?.paymentStatus === PaymentStatus.PENDING
  const isPaid =
    data?.status === OrderStatus.PAID ||
    data?.paymentStatus === PaymentStatus.SUCCEEDED

  return (
    <PageLayout>
      <div className={cls.paymentSuccessPage}>
        <div className={cls.paymentSuccessPage__mainContainer}>
          <PaymentSuccessHeader
            orderNumber={data?.orderNumber ?? ''}
            isPaid={isPaid}
          />
          <PaymentSuccessInfoCards />
          {showPaymentSection && data?.paymentUrl && !isPaid && (
            <PaymentSuccessPayInfo
              paymentMethod={data.paymentMethod}
              paymentUrl={data.paymentUrl}
            />
          )}
        </div>
        <PaymentSuccessNextSteps />
      </div>
    </PageLayout>
  )
}

export default PaymentSuccessPage