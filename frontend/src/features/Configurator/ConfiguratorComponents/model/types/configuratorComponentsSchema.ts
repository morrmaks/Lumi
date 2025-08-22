import { ComponentTypes } from '@/features/Configurator'

export interface IConfiguratorComponentDto {
  componentId: string
  componentType: ComponentTypes
}

export interface IConfiguratorComponent {
  id: string
  image: string
  name: string
  discountPrice: number
  componentType: ComponentTypes
}

export type ConfiguratorComponentMap = Record<ComponentTypes, string | null>

export interface ConfiguratorComponentsSchema {
  components: ConfiguratorComponentMap
  price: number
  isSynced: boolean
}
