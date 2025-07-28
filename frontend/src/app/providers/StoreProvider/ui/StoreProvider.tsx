import { createReduxStore, StateSchema } from '@/app/providers/StoreProvider'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'

interface StoreProviderProps {
  children?: ReactNode
  initialState?: DeepPartial<StateSchema>
}

export const StoreProvider = ({
  children,
  initialState,
}: StoreProviderProps) => {
  const store = createReduxStore(initialState as StateSchema)

  return <Provider store={store}>{children}</Provider>
}
