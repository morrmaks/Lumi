import { StateSchema } from './stateSchema'
import { Reducer, ReducersMapObject } from 'redux'
import { dropdownMenuReducer } from '@/entities/DropdownMenu'
import { createReducerManager } from '@/app/providers/StoreProvider/config/reducerManager'
import { configureStore } from '@reduxjs/toolkit'
import { breadcrumbNavReducer } from '@/features/BreadcrumbNav'
import { wishlistProductsReducer } from '@/features/Wishlist'
import { basketProductsReducer } from '@/features/Basket'
import { authReducer, userReducer } from '@/entities/User'
import { configuratorComponentsReducer } from '@/features/Configurator'
import { rtkApi, yaSuggestApi } from '@/shared/api'
import { forgotPasswordReducer } from '@/features/Auth'
import { orderReducer } from '@/features/Order'

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    auth: authReducer,
    order: orderReducer,
    forgotPassword: forgotPasswordReducer,
    dropdownMenu: dropdownMenuReducer,
    breadcrumbNav: breadcrumbNavReducer,
    wishlistProducts: wishlistProductsReducer,
    basketProducts: basketProductsReducer,
    configuratorComponents: configuratorComponentsReducer,
    [yaSuggestApi.reducerPath]: yaSuggestApi.reducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        rtkApi.middleware,
        yaSuggestApi.middleware,
      ]),
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  store.reducerManager = reducerManager

  return store
}

export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = AppStore['dispatch']
