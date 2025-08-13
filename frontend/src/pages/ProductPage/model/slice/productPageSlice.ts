import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductPageSchema } from '@/pages/ProductPage'
import { IProduct } from '@/features/Product'
import { ComponentNames } from '@/features/Configurator'

const initialState: ProductPageSchema = {
  product: {
    id: '',
    images: [],
    title: '',
    description: '',
    componentName: ComponentNames.GPU,
    specs: [],
    rating: '',
    reviews: 0,
    discountPrice: 0,
    price: 0,
  },
  isLoading: false,
}

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
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
