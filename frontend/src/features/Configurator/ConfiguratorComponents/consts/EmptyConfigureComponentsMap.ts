import { ComponentTypes } from '../consts/ComponentTypes'
import type {
  ConfiguratorComponentMap,
  IConfiguratorComponent,
} from '../model/types/configuratorComponentsSchema'

export const EmptyConfigureComponentIdsMap = Object.values(
  ComponentTypes
).reduce((acc, name) => {
  acc[name] = null
  return acc
}, {} as ConfiguratorComponentMap)

export const EmptyConfigureComponentsMap = Object.values(ComponentTypes).reduce(
  (acc, name) => {
    acc[name] = null
    return acc
  },
  {} as Record<ComponentTypes, IConfiguratorComponent | null>
)
