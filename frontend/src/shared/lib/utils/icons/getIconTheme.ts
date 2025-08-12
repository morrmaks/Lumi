import { IconsMap } from '@/shared/consts/icons'
import { IconTheme } from '@/shared/consts/iconTheme'

export const getIconTheme = (
  icon: keyof typeof IconsMap | keyof typeof IconTheme
) => {
  return IconTheme[icon as keyof typeof IconTheme] ?? IconTheme.PRIMARY
}
