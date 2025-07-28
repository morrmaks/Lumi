import { LoginSchema } from '@/features/Login'
import { DropdownMenuSchema } from '@/entities/DropdownMenu'
import { Reducer, ReducersMapObject, UnknownAction } from 'redux'
import { EnhancedStore } from '@reduxjs/toolkit'

export interface StateSchema {
  dropdownMenu: DropdownMenuSchema
  loginForm?: LoginSchema
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
  reduserManager: ReducerManager
}
