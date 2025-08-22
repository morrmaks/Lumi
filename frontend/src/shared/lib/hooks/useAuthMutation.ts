import { useAppSelector } from './useAppSelector'
import { getUserIsAuth } from '@/entities/User'

type MutationFn<TArg> = (arg: TArg) => void

export const useAuthMutation = <TArg>(
  mutation: MutationFn<TArg>
): MutationFn<TArg> => {
  const isAuth = useAppSelector(getUserIsAuth)

  return (arg: TArg) => {
    if (!isAuth) return
    return mutation(arg)
  }
}
