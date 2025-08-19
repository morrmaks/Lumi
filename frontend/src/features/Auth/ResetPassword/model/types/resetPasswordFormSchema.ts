import z from 'zod'

export const resetPasswordFormSchema = z.object({
  code: z.string(),
  password: z
    .string()
    .min(6, 'Минимум 6 символов')
    .max(32, 'Максимум 32 символа'),
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>
