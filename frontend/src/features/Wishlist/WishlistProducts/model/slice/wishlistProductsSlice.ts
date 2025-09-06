import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WishlistProductsSchema } from '@/features/Wishlist/WishlistProducts'
import { LocalStorage } from '@/shared/consts'
import { authApi } from '@/entities/User/api/authApi'

const initialState: WishlistProductsSchema = {
  products: [],
  isSynced: false,
}

const wishlistProductsSlice = createSlice({
  name: 'wishlistProducts',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<string | string[]>) {
      const itemsToAdd = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]

      if (itemsToAdd.length === 0) return

      const newItems = itemsToAdd.filter(
        (item) => !state.products.includes(item)
      )
      state.products.push(...newItems)

      if (state.isSynced) return
      localStorage.setItem(
        LocalStorage.WISHLIST,
        JSON.stringify(state.products)
      )
    },
    removeProduct(state, action: PayloadAction<string | string[]>) {
      const itemsToRemove = Array.isArray(action.payload)
        ? action.payload
        : [action.payload]

      state.products = state.products.filter(
        (product) => !itemsToRemove.includes(product)
      )

      if (state.isSynced) return
      if (state.products.length === 0) {
        localStorage.removeItem(LocalStorage.WISHLIST)
      } else {
        localStorage.setItem(
          LocalStorage.WISHLIST,
          JSON.stringify(state.products)
        )
      }
    },
    resetProducts(state: WishlistProductsSchema) {
      state.products = []
      if (state.isSynced) return
      localStorage.removeItem(LocalStorage.WISHLIST)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.postLogout.matchFulfilled, (state) => {
      state.products = []
      state.isSynced = false
    })
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state) => {
      state.isSynced = true
      localStorage.removeItem(LocalStorage.WISHLIST)
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

export const { actions: wishlistProductsActions } = wishlistProductsSlice
export const { reducer: wishlistProductsReducer } = wishlistProductsSlice
