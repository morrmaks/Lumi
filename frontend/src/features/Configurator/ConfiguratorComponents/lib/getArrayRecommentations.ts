import {
  ComponentRecommendations,
  ConfiguratorComponentMap,
} from '@/features/Configurator'
import { typedEntries } from '@/shared/lib/utils'

export const getArrayRecommendations = (
  components: ConfiguratorComponentMap
): string[] => {
  return typedEntries(components)
    .filter(([_, value]) => value === null)
    .map(([key]) => ComponentRecommendations[key])
}
