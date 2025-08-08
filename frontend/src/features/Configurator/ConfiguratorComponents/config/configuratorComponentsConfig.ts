import { IconsMap } from '@/shared/consts/icons'
import { ComponentNames } from '../consts/componentNames'
import { ComponentCatalogCategory } from '../consts/componentCatalogCategory'

export interface ConfiguratorComponentConfig {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
  category: ComponentCatalogCategory
}

export const configuratorComponentsConfig: Record<
  ComponentNames,
  ConfiguratorComponentConfig
> = {
  [ComponentNames.CPU]: {
    label: 'Процессор',
    icon: IconsMap.CPU,
    category: ComponentCatalogCategory.CPU,
  },
  [ComponentNames.GPU]: {
    label: 'Видеокарта',
    icon: IconsMap.GPU,
    category: ComponentCatalogCategory.GPU,
  },
  [ComponentNames.MB]: {
    label: 'Материнская плата',
    icon: IconsMap.MOTHERBOARD,
    category: ComponentCatalogCategory.MB,
  },
  [ComponentNames.RAM]: {
    label: 'Оперативная память',
    icon: IconsMap.RAM,
    category: ComponentCatalogCategory.RAM,
  },
  [ComponentNames.SSD]: {
    label: 'Накопитель SSD',
    icon: IconsMap.SSD,
    category: ComponentCatalogCategory.SSD,
  },
  [ComponentNames.PSU]: {
    label: 'Блок питания',
    icon: IconsMap.PSU,
    category: ComponentCatalogCategory.PSU,
  },
  [ComponentNames.COOLER]: {
    label: 'Охлаждение',
    icon: IconsMap.COOLER,
    category: ComponentCatalogCategory.COOLER,
  },
  [ComponentNames.CASE]: {
    label: 'Корпус',
    icon: IconsMap.CASE,
    category: ComponentCatalogCategory.CASE,
  },
}
