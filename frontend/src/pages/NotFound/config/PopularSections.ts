import {
  getRouteCatalog,
  getRouteConfigurator,
  getRouteProfile,
  getRouteWishlist,
} from '@/shared/consts/router'

interface PopularSection {
  to: string
  label: string
}

export const PopularSectionsConfig: PopularSection[] = [
  {
    to: getRouteConfigurator(),
    label: 'Конфигуратор',
  },
  {
    to: getRouteWishlist(),
    label: 'Избранное',
  },
  {
    to: getRouteProfile(),
    label: 'Профиль',
  },
  {
    to: getRouteCatalog(),
    label: 'Каталог',
  },
]
