import React from 'react'
import { render } from '@testing-library/react'
import { DynamicModuleLoader, ReducerList } from './DynamicModuleLoader'

const testReducer = (state = { value: 0 }) => state

const mockDispatch = jest.fn()
const mockStore = {
  getState: () => ({}),
  dispatch: mockDispatch,
  subscribe: jest.fn(),
  replaceReducer: jest.fn(),
  reducerManager: {
    getMountedReducers: jest.fn(() => ({})),
    add: jest.fn(),
    remove: jest.fn(),
  },
}

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux')
  return {
    ...actual,
    useStore: () => mockStore,
  }
})

jest.mock('@/shared/lib/hooks', () => ({
  useAppDispatch: () => mockDispatch,
}))

describe('DynamicModuleLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('рендерит дочерние элементы', () => {
    const { getByText } = render(
      <DynamicModuleLoader reducers={{ test: testReducer } as ReducerList}>
        <div>Child</div>
      </DynamicModuleLoader>
    )
    expect(getByText('Child')).toBeInTheDocument()
  })

  it('добавляет редюсер при монтировании', () => {
    render(
      <DynamicModuleLoader reducers={{ test: testReducer } as ReducerList}>
        <div>Child</div>
      </DynamicModuleLoader>
    )

    expect(mockStore.reducerManager.add).toHaveBeenCalledWith(
      'test',
      testReducer
    )
    expect(mockDispatch).toHaveBeenCalledWith({ type: '@@INIT test reducer' })
  })

  it('удаляет редюсер при размонтировании, если removeAfterUnmount=true', () => {
    const { unmount } = render(
      <DynamicModuleLoader
        reducers={{ test: testReducer } as ReducerList}
        removeAfterUnmount
      >
        <div>Child</div>
      </DynamicModuleLoader>
    )

    unmount()

    expect(mockStore.reducerManager.remove).toHaveBeenCalledWith('test')
    expect(mockDispatch).toHaveBeenCalledWith({
      type: '@@DESTROY test reducer',
    })
  })

  it('не удаляет редюсер при размонтировании, если removeAfterUnmount=false', () => {
    const { unmount } = render(
      <DynamicModuleLoader
        reducers={{ test: testReducer } as ReducerList}
        removeAfterUnmount={false}
      >
        <div>Child</div>
      </DynamicModuleLoader>
    )

    unmount()

    expect(mockStore.reducerManager.remove).not.toHaveBeenCalled()
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: '@@DESTROY test reducer',
    })
  })
})
