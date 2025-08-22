export interface IWishlistProduct {
  id: string
  name: string
  categorySlug: string
  price: number
  discountPrice: number
  rating: number
  reviews: number
  image: string
}

export interface WishlistProductsSchema {
  products: string[]
  isSynced: boolean
}
