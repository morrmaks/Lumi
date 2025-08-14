import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BannersSchema, IBannerCarousel } from '@/features/Banners'

const initialState: BannersSchema = {
  mainBannersCarousel: [],
  isLoading: false,
}

const bannersSlice = createSlice({
  name: 'banners',
  initialState,
  reducers: {
    setMainBannersCarousel(state, action: PayloadAction<IBannerCarousel[]>) {
      state.mainBannersCarousel.push(...action.payload)
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
  },
})

export const { actions: bannersActions } = bannersSlice
export const { reducer: bannersReducer } = bannersSlice
