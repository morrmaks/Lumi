import { ConfiguratorComponentMap } from '@/features/Configurator'

export const getTotalConfigPrice = (components: ConfiguratorComponentMap) => {
  return Object.values(components)
    .filter(Boolean)
    .reduce((acc, component) => acc + (component?.price ?? 0), 0)
}
