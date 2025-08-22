import { DropdownMenuSchema } from '@/entities/DropdownMenu'
import { Reducer, ReducersMapObject, UnknownAction } from 'redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { ForgotPasswordSchema } from 'src/features/Auth'
import { BreadcrumbNavSchema } from '@/features/BreadcrumbNav'
import { WishlistProductsSchema } from '@/features/Wishlist'
import { BasketProductsSchema } from '@/features/Basket'
import { AuthSchema, UserSchema } from '@/entities/User'
import { ConfiguratorComponentsSchema } from '@/features/Configurator'
import { CategoryPageSchema } from '@/pages/CategoryPage'
import { ProductPageSchema } from '@/pages/ProductPage'
import { rtkApi, yaSuggeestApi } from '@/shared/api'

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>
  [yaSuggeestApi.reducerPath]: ReturnType<typeof yaSuggeestApi.reducer>
  user: UserSchema
  auth: AuthSchema
  forgotPassword: ForgotPasswordSchema
  dropdownMenu: DropdownMenuSchema
  breadcrumbNav: BreadcrumbNavSchema
  wishlistProducts: WishlistProductsSchema
  basketProducts: BasketProductsSchema
  configuratorComponents: ConfiguratorComponentsSchema
  categoryPage?: CategoryPageSchema
  productPage?: ProductPageSchema
}

export type StateSchemaKey = keyof StateSchema

export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>
  getMountedReducers: () => MountedReducers
  reduce: (state: StateSchema, action: UnknownAction) => StateSchema
  add: (key: StateSchemaKey, reducer: Reducer) => void
  remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager
}
