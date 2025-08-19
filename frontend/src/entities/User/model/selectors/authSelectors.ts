import { StateSchema } from '@/app/providers/StoreProvider'

export const getUserIsAuth = (state: StateSchema) => state.auth.isAuth

export const getUserInited = (state: StateSchema) => state.auth.inited
