import ProfileSvg from '@/shared/assets/icons/profile.svg?react'
import ConfiguratorSvg from '@/shared/assets/icons/configurator.svg?react'
import CatalogSvg from '@/shared/assets/icons/catalog.svg?react'
import HeartSvg from '@/shared/assets/icons/heart.svg?react'
import HomeSvg from '@/shared/assets/icons/home.svg?react'
import SearchSvg from '@/shared/assets/icons/search.svg?react'
import SunIcon from '@/shared/assets/icons/sun.svg?react'
import MoonIcon from '@/shared/assets/icons/moon.svg?react'
import MapPinSvg from '@/shared/assets/icons/map-pin.svg?react'
import EmailSvg from '@/shared/assets/icons/mail.svg?react'
import PhoneSvg from '@/shared/assets/icons/phone.svg?react'
import TimeSvg from '@/shared/assets/icons/time.svg?react'
import FacebookSvg from '@/shared/assets/icons/facebook.svg?react'
import YoutubeSvg from '@/shared/assets/icons/youtube.svg?react'
import XMediaSvg from '@/shared/assets/icons/x-media.svg?react'
import InstagramSvg from '@/shared/assets/icons/instagram.svg?react'
import EyeSvg from '@/shared/assets/icons/eye.svg?react'
import EyeOffSvg from '@/shared/assets/icons/eye-off.svg?react'
import ChevronLeftSvg from '@/shared/assets/icons/chevron-left.svg?react'
import ChevronRightSvg from '@/shared/assets/icons/chevron-right.svg?react'
import ChevronUpSvg from '@/shared/assets/icons/chevron-up.svg?react'
import CheckMarkSvg from '@/shared/assets/icons/check.svg?react'
import BasketSvg from '@/shared/assets/icons/shopping-cart.svg?react'
import TrashSvg from '@/shared/assets/icons/trash.svg?react'
import StarSvg from '@/shared/assets/icons/star.svg?react'
import CreditCardSvg from '@/shared/assets/icons/credit-card.svg?react'
import PlusSvg from '@/shared/assets/icons/plus.svg?react'
import MinusSvg from '@/shared/assets/icons/minus.svg?react'
import BellSvg from '@/shared/assets/icons/bell.svg?react'
import CameraSvg from '@/shared/assets/icons/camera.svg?react'
import LockSvg from '@/shared/assets/icons/lock.svg?react'
import PackageSvg from '@/shared/assets/icons/package.svg?react'
import CrossSvg from '@/shared/assets/icons/cross.svg?react'
import CopySvg from '@/shared/assets/icons/copy.svg?react'
import LogoutSvg from '@/shared/assets/icons/logout.svg?react'
import CpuSvg from '@/shared/assets/icons/cpu.svg?react'
import GpuSvg from '@/shared/assets/icons/gpu.svg?react'
import CoolerSvg from '@/shared/assets/icons/fan.svg?react'
import MemoryStickSvg from '@/shared/assets/icons/memory-stick.svg?react'
import MotherboardSvg from '@/shared/assets/icons/motherboard.svg?react'
import PcCaseSvg from '@/shared/assets/icons/case.svg?react'
import StorageSvg from '@/shared/assets/icons/ssd.svg?react'
import ZapSvg from '@/shared/assets/icons/zap.svg?react'
import RefreshSvg from '@/shared/assets/icons/refresh.svg?react'
import GridSvg from '@/shared/assets/icons/grid.svg?react'
import ListSvg from '@/shared/assets/icons/list.svg?react'
import CircleSvg from '@/shared/assets/icons/circle-x.svg?react'
import CircleCheckSvg from '@/shared/assets/icons/circle-check.svg?react'
import ShoppingBagSvg from '@/shared/assets/icons/shopping-bag.svg?react'

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
  PASSWORD_SHOW: EyeSvg,
  PASSWORD_HIDE: EyeOffSvg,
  CHEVRON_LEFT: ChevronLeftSvg,
  CHEVRON_RIGHT: ChevronRightSvg,
  CHEVRON_UP: ChevronUpSvg,
  CHECK_MARK: CheckMarkSvg,
  BASKET: BasketSvg,
  TRASH: TrashSvg,
  RATING: StarSvg,
  PAYMENT: CreditCardSvg,
  PLUS: PlusSvg,
  MINUS: MinusSvg,
  NOTICE: BellSvg,
  PHOTO: CameraSvg,
  SAFETY: LockSvg,
  ORDERS: PackageSvg,
  CLOSE: CrossSvg,
  COPY: CopySvg,
  LOGOUT: LogoutSvg,
  CPU: CpuSvg,
  GPU: GpuSvg,
  MOTHERBOARD: MotherboardSvg,
  RAM: MemoryStickSvg,
  STORAGE: StorageSvg,
  PSU: ZapSvg,
  COOLER: CoolerSvg,
  CASE: PcCaseSvg,
  CHANGE: RefreshSvg,
  GRID: GridSvg,
  LIST: ListSvg,
  ERROR: CircleSvg,
  SUCCESS: CircleCheckSvg,
  SHOP: ShoppingBagSvg
} as const

export type IconsMap = (typeof IconsMap)[keyof typeof IconsMap]
export type IconsMapKeys = keyof typeof IconsMap
