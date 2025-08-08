import { ConfiguratorComponentMap } from '@/features/Configurator'

export const getConfiguratorProgress = (
  components: ConfiguratorComponentMap
) => {
  const total = Object.keys(components).length
  const filled = Object.values(components).filter(Boolean).length
  const progress = (filled / total) * 100
  return {
    total,
    filled,
    progress,
  }
}
