import { User } from '@/entities/User/model/types/user'

export const cleanedUser = (data: User): User => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatarUrl: data.avatarUrl,
    phone: data.phone,
    orders: data.orders,
    settings: {
      orderNotifications: data.settings?.orderNotifications ?? false,
      marketingNotifications: data.settings?.marketingNotifications ?? false,
      newsNotifications: data.settings?.newsNotifications ?? false,
    },
  }
}
