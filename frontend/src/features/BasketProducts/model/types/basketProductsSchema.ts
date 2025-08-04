export interface BasketProduct {
  id: string
  quantity: number
}

export interface BasketProductsSchema {
  products: BasketProduct[]
  isLoading: boolean
  error?: string
}
