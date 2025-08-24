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
  ordersCount?: number
}

export interface UserSchema {
  user?: User
}
