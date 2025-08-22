import { ConfiguratorComponentMap } from '@/features/Configurator'

export const getConfiguratorComponentIds = (
  components: ConfiguratorComponentMap
) => {
  return Object.values(components).filter((component) => component !== null)
}
