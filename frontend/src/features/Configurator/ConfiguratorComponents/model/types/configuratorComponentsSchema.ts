import { ComponentTypes } from '@/features/Configurator'

export interface ConfiguratorComponent {
  id: string
  image: string
  title: string
  price: number
}

export type ConfiguratorComponentMap = Record<
  ComponentTypes,
  ConfiguratorComponent | null
>

export interface ConfiguratorComponentsSchema {
  components: ConfiguratorComponentMap
  price: number
  isLoading: boolean
  error?: string
}
