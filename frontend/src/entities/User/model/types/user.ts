import { IOrder } from '@/features/Order'

export interface Settings {
  orderNotifications: boolean
  marketingNotifications: boolean
  newsNotifications: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  phone?: string
  settings?: Settings
  orders?: IOrder[]
}

export interface UserSchema {
  user?: User
}
