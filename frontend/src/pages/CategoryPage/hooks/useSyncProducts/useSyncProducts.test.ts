import { renderHook } from '@testing-library/react'
import * as hooks from '@/shared/lib/hooks'
import { useSyncProducts } from './useSyncProducts'
import { categoryPageActions } from '@/pages/CategoryPage'
import { ApiError } from '@/shared/types'
import { CategoryProductsWithHasMore } from '@/features/Category'

const dispatchMock = jest.fn()

jest.mock('@/shared/lib/hooks', () => {
  return {
    ...jest.requireActual('@/shared/lib/hooks'),
    useAppDispatch: jest.fn(),
  }
})

describe('useSyncProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(hooks.useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
  })

  it('очищает продукты, если нет данных или есть ошибка', () => {
    const error: ApiError = { status: 500, data: { message: 'Server error' } }

    renderHook(() => useSyncProducts(undefined, undefined, 1, dispatchMock))
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.setProducts([])
    )

    renderHook(() =>
      useSyncProducts(
        { products: [], hasMore: false },
        undefined,
        1,
        dispatchMock
      )
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.setProducts([])
    )

    renderHook(() => useSyncProducts(undefined, error, 1, dispatchMock))
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.setProducts([])
    )
  })

  it('ставит hasMore и новые продукты для page=1', () => {
    const productsData: CategoryProductsWithHasMore = {
      products: [
        {
          id: '1',
          image: 'img.png',
          name: 'Product 1',
          rating: 5,
          reviews: 10,
          price: 100,
          discountPrice: 90,
        },
      ],
      hasMore: true,
    }

    renderHook(() => useSyncProducts(productsData, undefined, 1, dispatchMock))
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.setHasMore(true)
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.setProducts(productsData.products)
    )
  })

  it('добавляет продукты для page>1', () => {
    const productsData: CategoryProductsWithHasMore = {
      products: [
        {
          id: '2',
          image: 'img2.png',
          name: 'Product 2',
          rating: 4,
          reviews: 5,
          price: 200,
          discountPrice: 180,
        },
      ],
      hasMore: false,
    }

    renderHook(() => useSyncProducts(productsData, undefined, 2, dispatchMock))
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.setHasMore(false)
    )
    expect(dispatchMock).toHaveBeenCalledWith(
      categoryPageActions.addProducts(productsData.products)
    )
  })
})
