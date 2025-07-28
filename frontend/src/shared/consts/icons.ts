import ProfileSvg from '@/shared/assets/icons/profile.svg'
import ConfiguratorSvg from '@/shared/assets/icons/configurator.svg'
import CatalogSvg from '@/shared/assets/icons/catalog.svg'
import HeartSvg from '@/shared/assets/icons/heart.svg'
import HomeSvg from '@/shared/assets/icons/home.svg'
import SearchSvg from '@/shared/assets/icons/search.svg'
import SunIcon from '@/shared/assets/icons/sun.svg'
import MoonIcon from '@/shared/assets/icons/moon.svg'
import MapPinSvg from '@/shared/assets/icons/map-pin.svg'
import EmailSvg from '@/shared/assets/icons/mail.svg'
import PhoneSvg from '@/shared/assets/icons/phone.svg'
import TimeSvg from '@/shared/assets/icons/time.svg'
import FacebookSvg from '@/shared/assets/icons/facebook.svg'
import YoutubeSvg from '@/shared/assets/icons/youtube.svg'
import XMediaSvg from '@/shared/assets/icons/x-media.svg'
import InstagramSvg from '@/shared/assets/icons/instagram.svg'

export const IconsMap = {
  PROFILE: ProfileSvg,
  CONFIGURATOR: ConfiguratorSvg,
  CATALOG: CatalogSvg,
  WISHLIST: HeartSvg,
  HOME: HomeSvg,
  SEARCH: SearchSvg,
  THEME_LIGHT: SunIcon,
  THEME_DARK: MoonIcon,
  ADDRESS: MapPinSvg,
  EMAIL: EmailSvg,
  PHONE: PhoneSvg,
  HOURS: TimeSvg,
  FACEBOOK: FacebookSvg,
  X_MEDIA: XMediaSvg,
  INSTAGRAM: InstagramSvg,
  YOUTUBE: YoutubeSvg,
} as const

export type IconsMap = (typeof IconsMap)[keyof typeof IconsMap]
