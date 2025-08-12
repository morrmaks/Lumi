export const ViewFormat = {
  GRID: 'grid',
  LIST: 'list',
} as const

export type ViewFormat = (typeof ViewFormat)[keyof typeof ViewFormat]
