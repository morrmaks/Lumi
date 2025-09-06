import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IBasketItem,
  BasketProductsSchema,
} from '../types/basketProductsSchema'
import { authApi } from '@/entities/User/api/authApi'
import { LocalStorage } from '@/shared/consts'

const initialState: BasketProductsSchema = {
  products: [],
  isSynced: false,
}

const basketProductsSlice = createSlice({
  name: 'basketProducts',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<string>) {
      const productId = action.payload
      const existing = state.products.find((p) => p.productId === productId)

      if (existing) {
        existing.quantity++
      } else {
        state.products.push({ productId, quantity: 1 })
      }

      if (state.isSynced) return
      localStorage.setItem(LocalStorage.BASKET, JSON.stringify(state.products))
    },
    addManyProducts(state, action: PayloadAction<string[]>) {
      const newProductIds = action.payload

      newProductIds.forEach((productId) => {
        const existing = state.products.find((p) => p.productId === productId)

        if (existing) {
          existing.quantity++
        } else {
          state.products.push({ productId, quantity: 1 })
        }
      })

      if (state.isSynced) return
      localStorage.setItem(LocalStorage.BASKET, JSON.stringify(state.products))
    },
    setSomeProducts(state, action: PayloadAction<IBasketItem[]>) {
      const newProducts = action.payload

      newProducts.forEach((newProduct) => {
        const index = state.products.findIndex(
          (p) => p.productId === newProduct.productId
        )

        if (index !== -1) {
          state.products[index] = newProduct
        } else {
          state.products.push(newProduct)
        }
      })

      if (state.isSynced) return
      localStorage.setItem(LocalStorage.BASKET, JSON.stringify(state.products))
    },
    setProducts(state, action: PayloadAction<IBasketItem[]>) {
      state.products = action.payload
    },
    decreaseProductQuantity(state, action: PayloadAction<string>) {
      const productId = action.payload
      const existProduct = state.products.find((p) => p.productId === productId)

      if (existProduct) {
        existProduct.quantity--
      }

      if (state.isSynced) return
      localStorage.setItem(LocalStorage.BASKET, JSON.stringify(state.products))
    },
    removeProduct(state, action: PayloadAction<string>) {
      const idToRemove = action.payload

      state.products = state.products.filter(
        (product) => idToRemove !== product.productId
      )

      if (state.isSynced) return
      if (state.products.length === 0) {
        localStorage.removeItem(LocalStorage.BASKET)
      } else {
        localStorage.setItem(
          LocalStorage.BASKET,
          JSON.stringify(state.products)
        )
      }
    },
    resetProducts(state: BasketProductsSchema) {
      state.products = []
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.postLogout.matchFulfilled, (state) => {
      state.products = []
      state.isSynced = false
    })
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state) => {
      state.isSynced = true
      localStorage.removeItem(LocalStorage.BASKET)
    })
    builder.addMatcher(authApi.endpoints.postLogin.matchFulfilled, (state) => {
      state.isSynced = true
    })
    builder.addMatcher(
      authApi.endpoints.postRegister.matchFulfilled,
      (state) => {
        state.isSynced = true
      }
    )
    builder.addMatcher(
      authApi.endpoints.postResetPassword.matchFulfilled,
      (state) => {
        state.isSynced = true
      }
    )
  },
})

export const { actions: basketProductsActions } = basketProductsSlice
export const { reducer: basketProductsReducer } = basketProductsSlice
