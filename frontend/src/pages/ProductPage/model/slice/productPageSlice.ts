import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductPageSchema } from '@/pages/ProductPage'
import { IProduct } from '@/features/Product'
import { ComponentTypes } from '@/features/Configurator'

const initialState: ProductPageSchema = {
  product: {
    id: '',
    categoryId: '',
    images: [],
    name: '',
    description: '',
    componentType: ComponentTypes.GPU,
    specs: {},
    rating: 1,
    reviews: 0,
    discountPrice: 0,
    price: 0,
  },
}

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<IProduct>) {
      state.product = action.payload
    },
    resetProductPage(state) {
      state.product = initialState.product
    },
  },
})

export const { actions: productPageActions } = productPageSlice
export const { reducer: productPageReducer } = productPageSlice
