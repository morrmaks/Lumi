export const SortFieldOptions = {
  PRICE_ASC: { field: 'discountPrice', order: 'asc' },
  PRICE_DESC: { field: 'price', order: 'desc' },
  REVIEWS_ASC: { field: 'rating', order: 'desc' },
  CREATED_DESC: { field: 'createdAt', order: 'desc' },
} as const

export type SortFieldOptions =
  (typeof SortFieldOptions)[keyof typeof SortFieldOptions]

export type SortFieldOptionKey = keyof typeof SortFieldOptions
