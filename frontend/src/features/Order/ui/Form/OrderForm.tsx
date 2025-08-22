import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './OrderForm.module.less'
import { ButtonSize } from '@/shared/ui/Button/Button'
import { Placeholders } from '@/shared/consts'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ApiErrorMessage } from '@/shared/ui/ApiErrorMessage'
import { Loader } from '@/shared/ui/Loader'
import { Select, SelectOption } from '@/shared/ui/Select'
import { useMemo } from 'react'
import {
  orderFormSchema,
  OrderFormValues,
  PaymentMethods,
  useCreateOrderMutation,
} from '@/features/Order'
import { AddressInput } from '../AddressInput'

const initialFormState: OrderFormValues = {
  address: '',
  paymentMethod: PaymentMethods.CARD,
}

export const OrderForm = () => {
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
    mode: 'onChange',
  })

  const paymentMethodOptions = useMemo<SelectOption<PaymentMethods>[]>(
    () => [
      { value: 'card', content: 'Картой' },
      { value: 'cash', content: 'При получении' },
    ],
    []
  )

  const onSubmit = async (data: OrderFormValues) => {
    try {
      await createOrder(data).unwrap()
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
