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
import EyeSvg from '@/shared/assets/icons/eye.svg'
import EyeOffSvg from '@/shared/assets/icons/eye-off.svg'
import ChevronLeftSvg from '@/shared/assets/icons/chevron-left.svg'
import ChevronRightSvg from '@/shared/assets/icons/chevron-right.svg'
import ChevronUpSvg from '@/shared/assets/icons/chevron-up.svg'
import CheckMarkSvg from '@/shared/assets/icons/check.svg'
import BasketSvg from '@/shared/assets/icons/shopping-cart.svg'
import TrashSvg from '@/shared/assets/icons/trash.svg'
import StarSvg from '@/shared/assets/icons/star.svg'
import CreditCardSvg from '@/shared/assets/icons/credit-card.svg'
import PlusSvg from '@/shared/assets/icons/plus.svg'
import MinusSvg from '@/shared/assets/icons/minus.svg'
import BellSvg from '@/shared/assets/icons/bell.svg'
import CameraSvg from '@/shared/assets/icons/camera.svg'
import LockSvg from '@/shared/assets/icons/lock.svg'
import PackageSvg from '@/shared/assets/icons/package.svg'
import CrossSvg from '@/shared/assets/icons/cross.svg'
import CopySvg from '@/shared/assets/icons/copy.svg'
import LogoutSvg from '@/shared/assets/icons/logout.svg'
import CpuSvg from '@/shared/assets/icons/cpu.svg'
import GpuSvg from '@/shared/assets/icons/gpu.svg'
import CoolerSvg from '@/shared/assets/icons/fan.svg'
import MemoryStickSvg from '@/shared/assets/icons/memory-stick.svg'
import MotherboardSvg from '@/shared/assets/icons/motherboard.svg'
import PcCaseSvg from '@/shared/assets/icons/case.svg'
import StorageSvg from '@/shared/assets/icons/ssd.svg'
import ZapSvg from '@/shared/assets/icons/zap.svg'
import RefreshSvg from '@/shared/assets/icons/refresh.svg'
import GridSvg from '@/shared/assets/icons/grid.svg'
import ListSvg from '@/shared/assets/icons/list.svg'

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
} as const

export type IconsMap = (typeof IconsMap)[keyof typeof IconsMap]
