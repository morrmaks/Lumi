export const CatalogCategoriesMap = {
  CPU: 'processors',
  GPU: 'graphics-cards',
  MB: 'motherboards',
  RAM: 'memory',
  STORAGE: 'storage',
  PSU: 'power-supplies',
  COOLER: 'coolers',
  CASE: 'cases',
} as const

export type CatalogCategoriesMap =
  (typeof CatalogCategoriesMap)[keyof typeof CatalogCategoriesMap]
