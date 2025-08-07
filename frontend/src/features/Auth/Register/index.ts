import { getRegisterState } from './model/selectors/getRegisterState'
import { registerReducer, registerActions } from './model/slice/registerSlice'
import { type RegisterSchema } from './model/types/registerSchema'
import { RegisterForm } from './ui/RegisterForm'
export {
  getRegisterState,
  registerReducer,
  registerActions,
  RegisterSchema,
  RegisterForm,
}
