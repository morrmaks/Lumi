import { ComponentNames } from '@/features/Configurator'

export interface ConfiguratorComponent {
  id: string
  image: string
  title: string
  price: number
}

export type ConfiguratorComponentIdsMap = Partial<
  Record<ComponentNames, string>
>
export type ConfiguratorComponentMap = Record<
  ComponentNames,
  ConfiguratorComponent | null
>

export interface ConfiguratorComponentsSchema {
  componentIds: ConfiguratorComponentIdsMap
  components: ConfiguratorComponentMap
  isLoading: boolean
  error?: string
}
