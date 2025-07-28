import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DropdownMenuSchema } from '@/entities/DropdownMenu'

const initialState: DropdownMenuSchema = {
  isOpen: false,
}

const DropdownMenuSlice = createSlice({
  name: 'dropdownMenu',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload
    },
  },
})

export const { actions: dropdownMenuActions } = DropdownMenuSlice
export const { reducer: dropdownMenuReducer } = DropdownMenuSlice
