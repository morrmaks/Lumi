import { ProfilePageTabs } from '@/pages/Profile'

interface ProfilePageTab {
  label: ProfilePageTabs
}

export const profilePageTabsConfig: ProfilePageTab[] = [
  {
    label: ProfilePageTabs.PROFILE,
  },
  {
    label: ProfilePageTabs.ORDERS,
  },
  {
    label: ProfilePageTabs.WISHLIST,
  },
  {
    label: ProfilePageTabs.SETTINGS,
  },
]
