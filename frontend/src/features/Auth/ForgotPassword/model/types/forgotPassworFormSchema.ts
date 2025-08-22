import z from 'zod'

export const forgotPasswordFormSchema = z.object({
  email: z.string().nonempty('Введите email').email('Некорректный email'),
})

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordFormSchema>
