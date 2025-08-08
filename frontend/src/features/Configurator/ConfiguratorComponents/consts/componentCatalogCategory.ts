export const ComponentCatalogCategory = {
  CPU: 'processors',
  GPU: 'graphics-cards',
  MB: 'motherboards',
  RAM: 'memory',
  SSD: 'storage',
  PSU: 'power-supplies',
  COOLER: 'coolers',
  CASE: 'cases',
} as const

export type ComponentCatalogCategory =
  (typeof ComponentCatalogCategory)[keyof typeof ComponentCatalogCategory]
