import {
  SortFieldOptions,
  SortFieldOptionKey,
  ViewFormat,
  getSortKeyByParams,
  getInitialView,
} from '@/pages/CategoryPage'
import { LocalStorage } from '@/shared/consts'

describe('getSortKeyByParams', () => {
  it('возвращает CREATED_DESC, если field = null', () => {
    expect(getSortKeyByParams(null, 'asc')).toBe('CREATED_DESC')
  })

  it('возвращает CREATED_DESC, если order = null', () => {
    expect(getSortKeyByParams('price', null)).toBe('CREATED_DESC')
  })

  it('возвращает правильный ключ, если field и order совпадают', () => {
    const key = Object.keys(SortFieldOptions)[0] as SortFieldOptionKey
    const { field, order } = SortFieldOptions[key]

    expect(getSortKeyByParams(field, order)).toBe(key)
  })

  it('возвращает CREATED_DESC, если field и order не найдены в SortFieldOptions', () => {
    expect(getSortKeyByParams('unknown', 'asc')).toBe('CREATED_DESC')
  })
})

describe('getInitialView', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {}

    return {
      getItem: (key: string) => store[key] ?? null,
      setItem: (key: string, value: string) => {
        store[key] = value
      },
      clear: () => {
        store = {}
      },
    }
  })()

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    })
  })

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('возвращает переданный view, если он есть', () => {
    expect(getInitialView(ViewFormat.LIST)).toBe(ViewFormat.LIST)
  })

  it('возвращает значение из localStorage, если view = null', () => {
    window.localStorage.setItem(LocalStorage.PRODUCTS_VIEW, ViewFormat.LIST)
    expect(getInitialView(null)).toBe(ViewFormat.LIST)
  })

  it('возвращает GRID, если view = null и localStorage пустой', () => {
    expect(getInitialView(null)).toBe(ViewFormat.GRID)
  })
})
