import { renderHook } from '@testing-library/react'
import { useSyncQueryParams } from './useSyncQueryParams'
import {
  SortFieldOptionKey,
  SortFieldOptions,
  ViewFormat,
} from '@/pages/CategoryPage'
import * as url from '@/shared/lib/url'

jest.mock('@/shared/lib/url', () => ({
  setQueryParams: jest.fn(),
}))

const setQueryParamsMock = url.setQueryParams as jest.Mock

type HookDeps = {
  search: string
  sort: SortFieldOptionKey
  view: ViewFormat
  page: number
  limit: number
}

describe('useSyncQueryParams', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('вызывает setQueryParams с правильными параметрами', () => {
    const deps: HookDeps = {
      search: 'test',
      sort: 'CREATED_DESC',
      view: ViewFormat.GRID,
      page: 1,
      limit: 10,
    }

    renderHook(() => useSyncQueryParams(deps))

    const { field, order } = SortFieldOptions['CREATED_DESC']
    expect(setQueryParamsMock).toHaveBeenCalledWith({
      search: 'test',
      field,
      order,
      view: ViewFormat.GRID,
      page: '1',
      limit: '10',
    })
  })

  it('обновляет параметры при изменении deps', () => {
    const initialDeps: HookDeps = {
      search: 'first',
      sort: 'CREATED_DESC',
      view: ViewFormat.GRID,
      page: 1,
      limit: 10,
    }

    const updatedDeps: HookDeps = {
      search: 'second',
      sort: 'PRICE_ASC',
      view: ViewFormat.LIST,
      page: 2,
      limit: 20,
    }

    const { rerender } = renderHook(
      ({ deps }: { deps: HookDeps }) => useSyncQueryParams(deps),
      {
        initialProps: { deps: initialDeps },
      }
    )

    rerender({ deps: updatedDeps })

    const { field, order } = SortFieldOptions['PRICE_ASC']
    expect(setQueryParamsMock).toHaveBeenLastCalledWith({
      search: 'second',
      field,
      order,
      view: ViewFormat.LIST,
      page: '2',
      limit: '20',
    })
  })
})
