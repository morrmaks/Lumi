import z from 'zod'

export const loginFormSchema = z.object({
  email: z.string().nonempty('Введите email').email('Некорректный email'),
  password: z.string().nonempty('Введите пароль'),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
