import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrderProduct, orderApi, OrderSchema } from '@/features/Order'

const initialState: OrderSchema = {
  isFromOrderLink: false,
  products: [],
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setIsFromOrderLink(state, action: PayloadAction<boolean>) {
      state.isFromOrderLink = action.payload
    },
    setProducts(state, action: PayloadAction<IOrderProduct[]>) {
      state.products = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      orderApi.endpoints.createOrder.matchFulfilled,
      (state) => {
        state.isFromOrderLink = false
        state.products = []
      }
    )
  },
})

export const { actions: orderActions } = orderSlice
export const { reducer: orderReducer } = orderSlice
