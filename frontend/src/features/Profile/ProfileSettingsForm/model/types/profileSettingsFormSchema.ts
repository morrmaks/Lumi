import z from 'zod'

export const profileSettingsFormSchema = z.object({
  currentPassword: z
    .string()
    .min(6, 'Минимум 6 символов')
    .max(32, 'Максимум 32 символа'),
  newPassword: z
    .string()
    .min(6, 'Минимум 6 символов')
    .max(32, 'Максимум 32 символа'),
})

export type ProfileSettingsFormValues = z.infer<
  typeof profileSettingsFormSchema
>
