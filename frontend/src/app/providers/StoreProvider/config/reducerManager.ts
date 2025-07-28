import {
  combineReducers,
  Reducer,
  ReducersMapObject,
  UnknownAction,
} from 'redux'
import {
  MountedReducers,
  ReducerManager,
  StateSchema,
  StateSchemaKey,
} from '@/app/providers/StoreProvider/config/stateSchema'

export const createReducerManager = (
  initialReducers: ReducersMapObject<StateSchema>
): ReducerManager => {
  const reducers = { ...initialReducers }

  let combinedReducers = combineReducers(
    reducers as ReducersMapObject<Required<StateSchema>>
  )

  let keyToRemove: StateSchemaKey[] = []
  const mountedReducers: MountedReducers = {}

  return {
    getReducerMap: () => reducers,

    getMountedReducers: () => mountedReducers,

    reduce: (state: StateSchema | undefined, action: UnknownAction) => {
      if (keyToRemove.length > 0 && state) {
        state = { ...state }
        for (const key of keyToRemove) {
          delete state[key]
        }
        keyToRemove = []
      }

      return combinedReducers(state as Partial<StateSchema>, action)
    },
    add: (key: StateSchemaKey, reducer: Reducer) => {
      if (!key || reducers[key]) return

      reducers[key] = reducer
      mountedReducers[key] = true
      combinedReducers = combineReducers(
        reducers as ReducersMapObject<Required<StateSchema>>
      )
    },
    remove: (key: StateSchemaKey) => {
      if (!key || !reducers[key]) return

      delete reducers[key]
      mountedReducers[key] = false
      keyToRemove.push(key)
      combinedReducers = combineReducers(
        reducers as ReducersMapObject<Required<StateSchema>>
      )
    },
  }
}
