import { StateSchema } from './stateSchema'
import { Reducer, ReducersMapObject } from 'redux'
import { dropdownMenuReducer } from '@/entities/DropdownMenu'
import { createReducerManager } from '@/app/providers/StoreProvider/config/reducerManager'
import { configureStore } from '@reduxjs/toolkit'
import { breadcrumbNavReducer } from '@/features/BreadcrumbNav'
import { wishlistProductsReducer } from '@/features/WishlistProducts'
import { basketProductsReducer } from '@/features/BasketProducts'

export const createReduxStore = (initialState?: StateSchema) => {
  const rootReducers: ReducersMapObject<StateSchema> = {
    dropdownMenu: dropdownMenuReducer,
    breadcrumbNav: breadcrumbNavReducer,
    wishlistProducts: wishlistProductsReducer,
    basketProducts: basketProductsReducer,
  }

  const reducerManager = createReducerManager(rootReducers)

  const store = configureStore({
    reducer: reducerManager.reduce as Reducer<StateSchema>,
    preloadedState: initialState,
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  store.reducerManager = reducerManager

  return store
}

export type AppStore = ReturnType<typeof createReduxStore>
export type AppDispatch = AppStore['dispatch']
