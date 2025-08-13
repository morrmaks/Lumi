import { LoginSchema } from 'src/features/Auth'
import { DropdownMenuSchema } from '@/entities/DropdownMenu'
import { Reducer, ReducersMapObject, UnknownAction } from 'redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RegisterSchema } from 'src/features/Auth'
import { ResetPasswordSchema } from 'src/features/Auth'
import { ForgotPasswordSchema } from 'src/features/Auth'
import { BreadcrumbNavSchema } from '@/features/BreadcrumbNav'
import { WishlistProductsSchema } from '@/features/Wishlist'
import { BasketProductsSchema } from '@/features/Basket'
import { UserSchema } from '@/entities/User'
import { ProfileCardSchema } from '@/features/Profile'
import { ProfileSettingsSchema } from '@/features/Profile'
import { ConfiguratorComponentsSchema } from '@/features/Configurator'
import { CategoryPageSchema } from '@/pages/CategoryPage'
import { ProductPageSchema } from '@/pages/ProductPage'

export interface StateSchema {
  user: UserSchema
  dropdownMenu: DropdownMenuSchema
  breadcrumbNav: BreadcrumbNavSchema
  wishlistProducts: WishlistProductsSchema
  basketProducts: BasketProductsSchema
  configuratorComponents: ConfiguratorComponentsSchema
  categoryPage?: CategoryPageSchema
  productPage?: ProductPageSchema
  loginForm?: LoginSchema
  registerForm?: RegisterSchema
  forgotPasswordForm?: ForgotPasswordSchema
  resetPasswordForm?: ResetPasswordSchema
  profileCardForm?: ProfileCardSchema
  profileSettingsForm?: ProfileSettingsSchema
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
