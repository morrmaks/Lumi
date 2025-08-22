export interface IBasketItem {
  productId: string
  quantity: number
}

export interface IBasketProduct {
  id: string
  name: string
  categorySlug: string
  price: number
  discountPrice: number
  rating: number
  reviews: number
  image: string
  quantity: number
}

export interface BasketProductsSchema {
  products: IBasketItem[]
  isSynced: boolean
}
