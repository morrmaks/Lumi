import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ConfiguratorComponent,
  ConfiguratorComponentMap,
  ConfiguratorComponentsSchema,
} from '../types/configuratorComponentsSchema'
import { ComponentTypes } from '../../consts/ComponentTypes'

const emptyComponentMap = Object.values(ComponentTypes).reduce((acc, name) => {
  acc[name] = null
  return acc
}, {} as ConfiguratorComponentMap)

const initialState: ConfiguratorComponentsSchema = {
  components: emptyComponentMap,
  price: 0,
  isLoading: false,
}

const configuratorComponentsSlice = createSlice({
  name: 'configuratorComponents',
  initialState,
  reducers: {
    setComponents: (
      state,
      action: PayloadAction<Partial<ConfiguratorComponentMap>>
    ) => {
      Object.entries(action.payload).forEach(
        ([componentName, componentInfo]) => {
          if (componentName in state.components) {
            state.components[componentName as ComponentTypes] = componentInfo
          }
        }
      )
    },
    setComponent: (
      state,
      action: PayloadAction<{
        name: ComponentTypes
        component: ConfiguratorComponent
      }>
    ) => {
      const { name, component } = action.payload
      state.components[name] = component
    },
    resetState: () => initialState,
  },
  //отслеживается авторизация, если произошла, от
})

export const { actions: configuratorComponentsActions } =
  configuratorComponentsSlice
export const { reducer: configuratorComponentsReducer } =
  configuratorComponentsSlice
