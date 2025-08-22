import z from 'zod'
import { PaymentMethods } from '../../consts'

export const orderFormSchema = z.object({
  address: z.string(),
  paymentMethod: z.enum(Object.values(PaymentMethods), {
    message: 'Выберите способ оплаты',
  }),
})

export type OrderFormValues = z.infer<typeof orderFormSchema>
