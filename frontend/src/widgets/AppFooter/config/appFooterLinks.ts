import {
  getRouteBasket,
  getRouteCatalog,
  getRouteConfigurator,
  getRouteMain,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'
import { IconsMap } from '@/shared/consts/icons'

interface ISocialLink {
  name: string
  href: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

interface IQuickLink {
  label: string
  to: string
}

interface ISupportLink {
  label: string
  to: string
}

interface IContact {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

interface ILegalDocsLink {
  label: string
  to: string
}

interface IAppFooterLinks {
  socialLinks: ISocialLink[]
  quickLinks: IQuickLink[]
  supportLinks: ISupportLink[]
  contacts: IContact[]
  legalDocs: ILegalDocsLink[]
}

export const appFooterLinks: IAppFooterLinks = {
  socialLinks: [
    {
      name: 'Facebook',
      href: '#',
      icon: IconsMap.FACEBOOK,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: IconsMap.INSTAGRAM,
    },
    {
      name: 'X-media',
      href: '#',
      icon: IconsMap.X_MEDIA,
    },
    {
      name: 'Youtube',
      href: '#',
      icon: IconsMap.YOUTUBE,
    },
  ],
  quickLinks: [
    {
      label: 'Каталог товаров',
      to: getRouteCatalog(),
    },
    {
      label: 'Конфигуратор ПК',
      to: getRouteConfigurator(),
    },
    {
      label: 'Избранное',
      to: getRouteWishlist(),
    },
    {
      label: 'Корзина',
      to: getRouteBasket(),
    },
    {
      label: 'Личный кабинет',
      to: getRouteProfile(),
    },
  ],
  supportLinks: [
    {
      label: 'Доставка',
      to: getRouteMain(),
    },
    {
      label: 'Гарантия',
      to: getRouteMain(),
    },
    {
      label: 'Возврат товара',
      to: getRouteMain(),
    },
    {
      label: 'FAQ',
      to: getRouteMain(),
    },
    {
      label: 'Техподдержка',
      to: getRouteMain(),
    },
  ],
  contacts: [
    {
      label: '+7 (999) 999-99-99',
      icon: IconsMap.PHONE,
    },
    {
      label: 'info_lumi@gmail.com',
      icon: IconsMap.EMAIL,
    },
    {
      label: 'Москва, ул. Тверская, 1',
      icon: IconsMap.ADDRESS,
    },
    {
      label: 'Пн-Пт: 9:00-21:00\nСб-Вс: 10:00-20:00',
      icon: IconsMap.HOURS,
    },
  ],
  legalDocs: [
    {
      label: 'Пользовательское соглашение',
      to: getRouteMain(),
    },
    {
      label: 'Политика конфиденциальности',
      to: getRouteMain(),
    },
    {
      label: 'Публичная оферта',
      to: getRouteMain(),
    },
  ],
}
