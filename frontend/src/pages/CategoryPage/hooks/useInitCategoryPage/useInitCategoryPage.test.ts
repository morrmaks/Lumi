import { renderHook } from '@testing-library/react'
import { useInitCategoryPage } from './useInitCategoryPage'
import * as categoryPage from '@/pages/CategoryPage'
import * as breadcrumbNav from '@/features/BreadcrumbNav'
import * as hooks from '@/shared/lib/hooks'

const dispatchMock = jest.fn()

jest.mock('@/shared/lib/hooks', () => {
  return {
    ...jest.requireActual('@/shared/lib/hooks'),
    useAppDispatch: jest.fn(),
  }
})

describe('useInitCategoryPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(hooks.useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
  })

  it('вызывает resetCategoryPage и setCategory/setBreadcrumbs при наличии data', () => {
    const data = {
      category: {
        id: '1',
        name: 'Cat',
        description: '',
        slug: '',
        productCount: 0,
      },
      breadcrumb: [{ name: 'Cat', path: '/cat' }],
    }
    const searchParams = new URLSearchParams(
      'field=name&order=asc&view=grid&search=test'
    )

    renderHook(() => useInitCategoryPage(dispatchMock, data, '1', searchParams))

    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPage.categoryPageActions.resetCategoryPage()
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPage.categoryPageActions.setCategory(data.category)
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      breadcrumbNav.breadcrumbNavActions.setBreadcrumbs(data.breadcrumb)
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'categoryPage/initFilters',
        payload: expect.objectContaining({ search: 'test' }),
      })
    )
  })

  it('вызывает resetCategoryPage на анмаунте', () => {
    const { unmount } = renderHook(() =>
      useInitCategoryPage(dispatchMock, undefined, '1', new URLSearchParams())
    )
    unmount()
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPage.categoryPageActions.resetCategoryPage()
    )
  })

  it('подставляет значения по умолчанию, если нет data и searchParams', () => {
    renderHook(() =>
      useInitCategoryPage(dispatchMock, undefined, '1', new URLSearchParams())
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'categoryPage/initFilters',
        payload: { search: '', sort: 'CREATED_DESC', view: 'grid' },
      })
    )
  })
})
