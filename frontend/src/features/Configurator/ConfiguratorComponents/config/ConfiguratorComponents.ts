import { IconsMap } from '@/shared/consts/icons'
import { ComponentTypes } from '../consts/ComponentTypes'
import { CatalogCategoriesMap } from '@/shared/consts/catalogCategoriesMap'

export interface ConfiguratorComponentConfig {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  category: CatalogCategoriesMap
}

export const ConfiguratorComponentsConfig: Record<
  ComponentTypes,
  ConfiguratorComponentConfig
> = {
  [ComponentTypes.CPU]: {
    label: 'Процессор',
    icon: IconsMap.CPU,
    category: CatalogCategoriesMap.CPU,
  },
  [ComponentTypes.GPU]: {
    label: 'Видеокарта',
    icon: IconsMap.GPU,
    category: CatalogCategoriesMap.GPU,
  },
  [ComponentTypes.MB]: {
    label: 'Мат. плата',
    icon: IconsMap.MOTHERBOARD,
    category: CatalogCategoriesMap.MB,
  },
  [ComponentTypes.RAM]: {
    label: 'Оперативная память',
    icon: IconsMap.RAM,
    category: CatalogCategoriesMap.RAM,
  },
  [ComponentTypes.STORAGE]: {
    label: 'Накопитель SSD',
    icon: IconsMap.STORAGE,
    category: CatalogCategoriesMap.STORAGE,
  },
  [ComponentTypes.PSU]: {
    label: 'Блок питания',
    icon: IconsMap.PSU,
    category: CatalogCategoriesMap.PSU,
  },
  [ComponentTypes.COOLER]: {
    label: 'Охлаждение',
    icon: IconsMap.COOLER,
    category: CatalogCategoriesMap.COOLER,
  },
  [ComponentTypes.CASE]: {
    label: 'Корпус',
    icon: IconsMap.CASE,
    category: CatalogCategoriesMap.CASE,
  },
}
