import { ProfilePageTabs } from '@/pages/Profile/consts'

interface ProfilePageTab {
  label: ProfilePageTabs
}

export const ProfilePageTabsConfig: ProfilePageTab[] = [
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
