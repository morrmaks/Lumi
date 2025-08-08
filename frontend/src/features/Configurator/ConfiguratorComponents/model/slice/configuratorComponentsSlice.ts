import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ConfiguratorComponentIdsMap,
  ConfiguratorComponent,
  ConfiguratorComponentMap,
  ConfiguratorComponentsSchema,
} from '../types/configuratorComponentsSchema'
import { ComponentNames } from '../../consts/componentNames'

const emptyComponentMap = Object.values(ComponentNames).reduce((acc, name) => {
  acc[name] = null
  return acc
}, {} as ConfiguratorComponentMap)

const initialState: ConfiguratorComponentsSchema = {
  componentIds: {},
  components: emptyComponentMap,
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
            state.components[componentName as ComponentNames] = componentInfo
          }
        }
      )
    },
    setComponent: (
      state,
      action: PayloadAction<{
        name: ComponentNames
        component: ConfiguratorComponent
      }>
    ) => {
      const { name, component } = action.payload
      state.components[name] = component
    },
    setComponentIds: (
      state,
      action: PayloadAction<ConfiguratorComponentIdsMap>
    ) => {
      Object.entries(action.payload).forEach(([componentName, componentId]) => {
        if (componentName in state.componentIds) {
          state.componentIds[componentName as ComponentNames] = componentId
        }
      })
    },
    setComponentId: (
      state,
      action: PayloadAction<{ name: ComponentNames; id: string }>
    ) => {
      const { name, id } = action.payload
      state.componentIds[name] = id
    },
    resetState: () => initialState,
  },
})

export const { actions: configuratorComponentsActions } =
  configuratorComponentsSlice
export const { reducer: configuratorComponentsReducer } =
  configuratorComponentsSlice
