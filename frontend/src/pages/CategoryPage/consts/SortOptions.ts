export const SortFieldOptions = {
  PRICE_ASC: 'price-asc',
  PRICE_DESC: 'price-desc',
  REVIEWS_ASC: 'reviews-asc',
} as const

export type SortFieldOptions =
  (typeof SortFieldOptions)[keyof typeof SortFieldOptions]
