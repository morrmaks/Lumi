import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BreadcrumbNavSchema, IBreadcrumb } from '@/features/BreadcrumbNav'

const initialState: BreadcrumbNavSchema = {}

const breadcrumbNavSlice = createSlice({
  name: 'breadcrumbNav',
  initialState,
  reducers: {
    setBreadcrumbs(state, action: PayloadAction<IBreadcrumb[]>) {
      action.payload.forEach((bc) => {
        state[bc.path] = bc.name
      })
    },
    setBreadcrumb(state, action: PayloadAction<IBreadcrumb>) {
      const { path, name } = action.payload
      state[path] = name
    },
  },
})

export const { actions: breadcrumbNavActions } = breadcrumbNavSlice
export const { reducer: breadcrumbNavReducer } = breadcrumbNavSlice
