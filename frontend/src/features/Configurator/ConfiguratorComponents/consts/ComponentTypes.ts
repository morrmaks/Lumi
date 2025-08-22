export const ComponentTypes = {
  CPU: 'processor',
  GPU: 'graphics-card',
  MB: 'motherboard',
  RAM: 'memory',
  STORAGE: 'storage',
  PSU: 'power-supplier',
  COOLER: 'cooler',
  CASE: 'case',
} as const

export type ComponentTypesKey = keyof typeof ComponentTypes
export type ComponentTypes = (typeof ComponentTypes)[ComponentTypesKey]

export type ComponentTypeToKey = {
  [K in ComponentTypesKey as (typeof ComponentTypes)[K]]: K
}
export const ComponentTypeToKeyMap: Record<ComponentTypes, ComponentTypesKey> =
  Object.entries(ComponentTypes).reduce(
    (acc, [key, value]) => {
      acc[value as ComponentTypes] = key as ComponentTypesKey
      return acc
    },
    {} as Record<ComponentTypes, ComponentTypesKey>
  )
