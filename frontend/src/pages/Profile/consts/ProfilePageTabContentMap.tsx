import { ProfilePageTabs } from './ProfilePageTabs'
import {
  ProfileCard,
  ProfileOrders,
  ProfileSettings,
  ProfileWishlist,
} from '@/entities/Profile'
import { ReactNode } from 'react'

export const ProfilePageTabContentMap: Record<ProfilePageTabs, ReactNode> = {
  [ProfilePageTabs.PROFILE]: <ProfileCard />,
  [ProfilePageTabs.ORDERS]: <ProfileOrders />,
  [ProfilePageTabs.WISHLIST]: <ProfileWishlist />,
  [ProfilePageTabs.SETTINGS]: <ProfileSettings />,
}
