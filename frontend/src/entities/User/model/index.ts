import { authReducer, authActions } from './slices/authSlice'
import { userReducer, userActions } from './slices/userSlice'
import type { Settings, UserSchema } from './types/user'
import type { AuthSchema } from './types/auth'

export * from './selectors/authSelectors'
export * from './selectors/userSelectors'
export {
  userReducer,
  userActions,
  authReducer,
  authActions,
  Settings,
  UserSchema,
  AuthSchema,
}
