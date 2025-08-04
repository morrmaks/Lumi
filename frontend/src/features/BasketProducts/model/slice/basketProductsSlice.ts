import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  BasketProduct,
  BasketProductsSchema,
} from '../types/basketProductsSchema'

const initialState: BasketProductsSchema = {
  products: [],
  isLoading: false,
}

const basketProductsSlice = createSlice({
  name: 'basketProducts',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<BasketProduct>) {
      const product = action.payload
      const index = state.products.findIndex((p) => p.id === product.id)

      if (index !== -1) {
        state.products[index] = product
      } else {
        state.products.push(product)
      }

      localStorage.setItem('Lumi_basket', JSON.stringify(state.products))
    },
    addManyProducts(state, action: PayloadAction<BasketProduct[]>) {
      const newProducts = action.payload

      newProducts.forEach((product) => {
        const index = state.products.findIndex((p) => p.id === product.id)

        if (index !== -1) {
          state.products[index].quantity = product.quantity
        } else {
          state.products.push(product)
        }
      })

      localStorage.setItem('Lumi_basket', JSON.stringify(state.products))
    },
    decreaseProductQuantity(state, action: PayloadAction<BasketProduct>) {
      const product = action.payload
      const index = state.products.findIndex((p) => p.id === product.id)

      state.products[index].quantity = product.quantity

      localStorage.setItem('Lumi_basket', JSON.stringify(state.products))
    },
    removeProduct(state, action: PayloadAction<BasketProduct>) {
      const itemToRemove = action.payload

      state.products = state.products.filter(
        (product) => itemToRemove.id !== product.id
      )

      if (state.products.length === 0) {
        localStorage.removeItem('Lumi_basket')
      } else {
        localStorage.setItem('Lumi_basket', JSON.stringify(state.products))
      }
    },
    resetProducts(state: BasketProductsSchema) {
      state.products = []
    },
  },
})

export const { actions: basketProductsActions } = basketProductsSlice
export const { reducer: basketProductsReducer } = basketProductsSlice
