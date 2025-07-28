import type {
  StateSchema,
  ReducerManager,
  StateSchemaKey,
  MountedReducers,
  ReduxStoreWithManager,
} from './config/stateSchema'
import {
  type AppStore,
  type AppDispatch,
  createReduxStore,
} from './config/store'
import { StoreProvider } from './ui/StoreProvider'

export {
  StateSchema,
  StateSchemaKey,
  ReducerManager,
  MountedReducers,
  ReduxStoreWithManager,
  AppStore,
  AppDispatch,
  createReduxStore,
  StoreProvider,
}
