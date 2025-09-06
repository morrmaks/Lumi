import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SlideMenuSchema } from 'src/entities/SlideMenu'

const initialState: SlideMenuSchema = {
  isOpen: false,
}

const SlideMenuSlice = createSlice({
  name: 'slideMenu',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

export const { actions: slideMenuActions } = SlideMenuSlice
export const { reducer: slideMenuReducer } = SlideMenuSlice
