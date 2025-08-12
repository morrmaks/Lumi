export const IconTheme = {
  PRIMARY: 'primary',
  YELLOW: 'yellow',
  CPU: 'cpu',
  GPU: 'gpu',
  MOTHERBOARD: 'motherboard',
  RAM: 'ram',
  STORAGE: 'storage',
  PSU: 'psu',
  COOLER: 'cooler',
  CASE: 'case',
} as const

export type IconTheme = (typeof IconTheme)[keyof typeof IconTheme]
