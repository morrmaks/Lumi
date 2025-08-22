import z from 'zod'

export const profileCardFormSchema = z.object({
  name: z.string(),
  email: z.string().min(1, 'Введите email').email('Некорректный email'),
  phone: z.union([
    z.literal(''),
    z.string().regex(/^(\+7|8)\d{10}$/, 'Введите корректный номер телефона'),
  ]),
})

export type ProfileCardFormValues = z.infer<typeof profileCardFormSchema>
