import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BreadcrumbNavSchema } from '@/features/BreadcrumbNav'

const initialState: BreadcrumbNavSchema = {}

const breadcrumbNavSlice = createSlice({
  name: 'breadcrumbNav',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<{ path: string; name: string }>) {
      const { path, name } = action.payload
      state[path] = name
    },
  },
})

export const { actions: breadcrumbNavActions } = breadcrumbNavSlice
export const { reducer: breadcrumbNavReducer } = breadcrumbNavSlice
