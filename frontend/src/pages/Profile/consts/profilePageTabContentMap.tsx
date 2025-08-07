import { ProfilePageTabs } from './profilePageTabs'
import {
  ProfileCard,
  ProfileOrders,
  ProfileSettings,
  ProfileWishlist,
} from '@/entities/Profile'
import { ReactNode } from 'react'

export const profilePageTabContentMap: Record<ProfilePageTabs, ReactNode> = {
  [ProfilePageTabs.PROFILE]: <ProfileCard />,
  [ProfilePageTabs.ORDERS]: <ProfileOrders />,
  [ProfilePageTabs.WISHLIST]: <ProfileWishlist />,
  [ProfilePageTabs.SETTINGS]: <ProfileSettings />,
}
