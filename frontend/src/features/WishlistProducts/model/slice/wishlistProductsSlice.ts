import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WishlistProductsSchema } from '@/features/WishlistProducts'

const initialState: WishlistProductsSchema = {
  products: [],
}

const wishlistProductsSlice = createSlice({
  name: 'wishlistProducts',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<string | string[]>) {
      const itemsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]

      state.products.push(...itemsToAdd)

      localStorage.setItem('Lumi_wishlist', JSON.stringify(state.products))
    },
    removeProduct(state, action: PayloadAction<string>) {
      const itemsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]

      state.products = state.products.filter(
        (product) => !itemsToRemove.includes(product)
      )

      if (state.products.length === 0) {
        localStorage.removeItem('Lumi_wishlist')
      } else {
        localStorage.setItem('Lumi_wishlist', JSON.stringify(state.products))
      }
    },
    resetProducts(state: WishlistProductsSchema) {
      state.products = []
    },
  },
})

export const { actions: wishlistProductsActions } = wishlistProductsSlice
export const { reducer: wishlistProductsReducer } = wishlistProductsSlice
