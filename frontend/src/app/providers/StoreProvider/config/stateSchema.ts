import { LoginSchema } from '@/features/Login'
import { DropdownMenuSchema } from '@/entities/DropdownMenu'
import { Reducer, ReducersMapObject, UnknownAction } from 'redux'
import { EnhancedStore } from '@reduxjs/toolkit'
import { RegisterSchema } from '@/features/Register'
import { ResetPasswordSchema } from '@/features/ResetPassword'
import { ForgotPasswordSchema } from '@/features/ForgotPassword'
import { BreadcrumbNavSchema } from '@/features/BreadcrumbNav'
import { WishlistProductsSchema } from '@/features/WishlistProducts'
import { BasketProductsSchema } from '@/features/BasketProducts'

export interface StateSchema {
  dropdownMenu: DropdownMenuSchema
  breadcrumbNav: BreadcrumbNavSchema
  wishlistProducts: WishlistProductsSchema
  basketProducts: BasketProductsSchema
  loginForm?: LoginSchema
  registerForm?: RegisterSchema
  forgotPasswordForm?: ForgotPasswordSchema
  resetPasswordForm?: ResetPasswordSchema
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
