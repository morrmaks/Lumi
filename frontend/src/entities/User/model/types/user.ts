import { IOrder } from '@/features/Order'

export interface Settings {
  orderNotifications: boolean
  marketingNotifications: boolean
  newsNotifications: boolean
}

export interface User {
  id: string
  username: string
  email: string
  avatar: string
  phone: string
  isActivated: boolean
  orders: IOrder[]
}

export interface UserSchema {
  isForgotPassword: boolean
  inited: boolean
  authData?: User
  settings?: Settings
}
