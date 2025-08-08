export const ComponentNames = {
  CPU: 'processor',
  GPU: 'graphics-card',
  MB: 'motherboard',
  RAM: 'memory',
  SSD: 'storage',
  PSU: 'power-supplier',
  COOLER: 'cooler',
  CASE: 'case',
} as const

export type ComponentNames =
  (typeof ComponentNames)[keyof typeof ComponentNames]
