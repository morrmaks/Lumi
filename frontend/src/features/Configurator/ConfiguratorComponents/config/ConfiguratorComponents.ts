import { IconsMap } from '@/shared/consts/icons'
import { ComponentNames } from '../consts/ComponentNames'
import { CatalogCategoriesMap } from '@/shared/consts/catalogCategoriesMap'

export interface ConfiguratorComponentConfig {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  category: CatalogCategoriesMap
}

export const ConfiguratorComponentsConfig: Record<
  ComponentNames,
  ConfiguratorComponentConfig
> = {
  [ComponentNames.CPU]: {
    label: 'Процессор',
    icon: IconsMap.CPU,
    category: CatalogCategoriesMap.CPU,
  },
  [ComponentNames.GPU]: {
    label: 'Видеокарта',
    icon: IconsMap.GPU,
    category: CatalogCategoriesMap.GPU,
  },
  [ComponentNames.MB]: {
    label: 'Мат. плата',
    icon: IconsMap.MOTHERBOARD,
    category: CatalogCategoriesMap.MB,
  },
  [ComponentNames.RAM]: {
    label: 'Оперативная память',
    icon: IconsMap.RAM,
    category: CatalogCategoriesMap.RAM,
  },
  [ComponentNames.STORAGE]: {
    label: 'Накопитель SSD',
    icon: IconsMap.STORAGE,
    category: CatalogCategoriesMap.STORAGE,
  },
  [ComponentNames.PSU]: {
    label: 'Блок питания',
    icon: IconsMap.PSU,
    category: CatalogCategoriesMap.PSU,
  },
  [ComponentNames.COOLER]: {
    label: 'Охлаждение',
    icon: IconsMap.COOLER,
    category: CatalogCategoriesMap.COOLER,
  },
  [ComponentNames.CASE]: {
    label: 'Корпус',
    icon: IconsMap.CASE,
    category: CatalogCategoriesMap.CASE,
  },
}
