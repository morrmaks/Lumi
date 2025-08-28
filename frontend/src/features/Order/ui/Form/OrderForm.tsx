import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './OrderForm.module.less'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { getRoutePaymentSuccess, Placeholders } from '@/shared/consts'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { Loader } from '@/shared/ui/Loader'
import { Select, SelectOption } from '@/shared/ui/Select'
import { useMemo } from 'react'
import { getOrderProducts, orderFormSchema, OrderFormValues } from '../../model'
import { AddressInput } from '../AddressInput'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { PaymentMethods } from '../../consts'
import { useCreateOrderMutation } from '@/features/Order'

const initialFormState: OrderFormValues = {
  address: '',
  paymentMethod: PaymentMethods.CARD,
}

export const OrderForm = () => {
  const navigate = useNavigate()
  const products = useAppSelector(getOrderProducts)
  const dispatch = useAppDispatch()
  const [createOrder, { isLoading, error: orderError }] =
    useCreateOrderMutation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: initialFormState,
  })

  const paymentMethodOptions = useMemo<SelectOption<PaymentMethods>[]>(
    () => [
      { value: PaymentMethods.CARD, content: 'Картой' },
      { value: PaymentMethods.CASH, content: 'При получении' },
    ],
    []
  )

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const orderResponse = await createOrder({
        ...data,
        products,
      }).unwrap()
      if (paymentMethods === PaymentMethods.CARD) {
        window.location.href = orderResponse.paymentUrl
      } else {
        console.log('должен сработать navigate')
        navigate(`${getRoutePaymentSuccess()}?orderId=${orderResponse.orderId}`)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const paymentMethods = useWatch({
    name: 'paymentMethod',
    control,
  })

  return (
    <form
      className={cls.orderForm}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <label htmlFor="address" className={cls.orderForm__label}>
        {Placeholders.features.order.orderForm.labels.address}
        <Controller
          control={control}
          name={'address'}
          render={({ field }) => (
            <AddressInput
              id={'address'}
              value={field.value}
              onChange={field.onChange}
              disabled={isLoading}
            />
          )}
        />
        {errors.address && (
          <span className={cls.orderForm__errors}>
            {errors.address.message}
          </span>
        )}
      </label>
      <label htmlFor="paymentMethod" className={cls.orderForm__label}>
        {Placeholders.features.order.orderForm.labels.paymentMethod}
        <Controller
          control={control}
          name={'paymentMethod'}
          render={({ field }) => (
            <Select<PaymentMethods>
              className={cls.orderForm__select}
              options={paymentMethodOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.paymentMethod && (
          <span className={cls.orderForm__errors}>
            {errors.paymentMethod.message}
          </span>
        )}
      </label>
      <ApiErrorMessage error={orderError} />
      <Button
        type={'submit'}
        theme={ButtonTheme.PRIMARY}
        fullWidth={true}
        size={ButtonSize.L}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader delay={0} />
        ) : (
          `${
            paymentMethods === PaymentMethods.CARD
              ? Placeholders.features.order.orderForm.submitWithPayment
              : Placeholders.features.order.orderForm.submit
          }`
        )}
      </Button>
    </form>
  )
}
