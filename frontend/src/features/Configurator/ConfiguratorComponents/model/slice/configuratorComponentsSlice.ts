import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IConfiguratorComponentDto,
  ConfiguratorComponentsSchema,
} from '../types/configuratorComponentsSchema'
import { authApi } from '@/entities/User/api/authApi'
import { LocalStorage } from '@/shared/consts'
import { EmptyConfigureComponentIdsMap } from '../../consts/EmptyConfigureComponentsMap'

const initialState: ConfiguratorComponentsSchema = {
  components: EmptyConfigureComponentIdsMap,
  price: 0,
  isSynced: false,
}

const configuratorComponentsSlice = createSlice({
  name: 'configuratorComponents',
  initialState,
  reducers: {
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload
    },
    setComponents: (
      state,
      action: PayloadAction<IConfiguratorComponentDto[]>
    ) => {
      action.payload.forEach(({ componentType, componentId }) => {
        if (componentType in state.components) {
          state.components[componentType] = componentId
        }
      })

      if (state.isSynced) return
      localStorage.setItem(
        LocalStorage.CONFIGURATOR,
        JSON.stringify(state.components)
      )
    },
    setComponent: (state, action: PayloadAction<IConfiguratorComponentDto>) => {
      const { componentType, componentId } = action.payload
      state.components[componentType] = componentId

      if (state.isSynced) return
      localStorage.setItem(
        LocalStorage.CONFIGURATOR,
        JSON.stringify(state.components)
      )
    },
    removeComponent: (
      state,
      action: PayloadAction<IConfiguratorComponentDto>
    ) => {
      state.components[action.payload.componentType] = null

      if (state.isSynced) return
      localStorage.setItem(
        LocalStorage.CONFIGURATOR,
        JSON.stringify(state.components)
      )
    },
    resetComponents: (state) => {
      state.components = EmptyConfigureComponentIdsMap
      if (state.isSynced) return
      localStorage.removeItem(LocalStorage.CONFIGURATOR)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.postLogout.matchFulfilled, (state) => {
      state.components = EmptyConfigureComponentIdsMap
      state.isSynced = false
    })
    builder.addMatcher(authApi.endpoints.postLogin.matchFulfilled, (state) => {
      state.components = EmptyConfigureComponentIdsMap
      state.isSynced = true
    })
    builder.addMatcher(
      authApi.endpoints.postRegister.matchFulfilled,
      (state) => {
        state.components = EmptyConfigureComponentIdsMap
        state.isSynced = true
      }
    )
    builder.addMatcher(
      authApi.endpoints.postResetPassword.matchFulfilled,
      (state) => {
        state.components = EmptyConfigureComponentIdsMap
        state.isSynced = true
      }
    )
    builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state) => {
      state.components = EmptyConfigureComponentIdsMap
      state.isSynced = true
      localStorage.removeItem(LocalStorage.CONFIGURATOR)
    })
  },
})

export const { actions: configuratorComponentsActions } =
  configuratorComponentsSlice
export const { reducer: configuratorComponentsReducer } =
  configuratorComponentsSlice
