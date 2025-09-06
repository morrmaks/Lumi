import { renderHook, act } from '@testing-library/react'
import { useWishlistProductsActions } from './useWishlistProductsActions'
import {
  useDeleteWishlistProductMutation,
  useDeleteWishlistProductsMutation,
} from '@/features/Wishlist/api/wishlistApi'
import {
  basketProductsActions,
  IBasketItem,
  useAddBasketProductsMutation,
} from '@/features/Basket'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { IWishlistProduct } from '@/features/Wishlist'

jest.mock('@/features/Wishlist/api/wishlistApi')
jest.mock('@/features/Basket')
jest.mock('@/shared/lib/hooks')

describe('useWishlistProductsActions', () => {
  const dispatchMock = jest.fn()
  const setSelectMock = jest.fn()

  let deleteWishlistProductMock: jest.Mock
  let deleteWishlistProductsMock: jest.Mock
  let addToBasketProductsMock: jest.Mock

  const basketItems: IBasketItem[] = [
    { productId: '1', quantity: 1 },
    { productId: '2', quantity: 1 },
  ]

  const wishlistProducts: IWishlistProduct[] = [
    {
      id: '1',
      name: 'Product 1',
      categorySlug: 'cat',
      price: 100,
      discountPrice: 90,
      rating: 5,
      reviews: 10,
      image: '1.jpg',
    },
    {
      id: '2',
      name: 'Product 2',
      categorySlug: 'cat',
      price: 200,
      discountPrice: 180,
      rating: 4,
      reviews: 5,
      image: '2.jpg',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
    ;(useAppSelector as jest.Mock).mockReturnValue(true) // isAuth = true

    deleteWishlistProductMock = jest.fn().mockResolvedValue(true)
    ;(useDeleteWishlistProductMutation as jest.Mock).mockReturnValue([
      deleteWishlistProductMock,
      { isLoading: false },
    ])

    deleteWishlistProductsMock = jest.fn().mockResolvedValue(true)
    ;(useDeleteWishlistProductsMutation as jest.Mock).mockReturnValue([
      deleteWishlistProductsMock,
      { isLoading: false },
    ])

    addToBasketProductsMock = jest.fn().mockResolvedValue(true)
    ;(useAddBasketProductsMutation as jest.Mock).mockReturnValue([
      addToBasketProductsMock,
      { isLoading: false },
    ])
  })

  it('selectAllCards выбирает все или очищает', () => {
    const { result } = renderHook(() =>
      useWishlistProductsActions(
        basketItems,
        wishlistProducts,
        [],
        setSelectMock
      )
    )

    act(() => {
      result.current.selectAllCards(true)
    })
    expect(setSelectMock).toHaveBeenCalledWith(['1', '2'])

    act(() => {
      result.current.selectAllCards(false)
    })
    expect(setSelectMock).toHaveBeenCalledWith([])
  })

  it('selectCard добавляет и убирает карточку', () => {
    const { result } = renderHook(() =>
      useWishlistProductsActions(
        basketItems,
        wishlistProducts,
        ['1'],
        setSelectMock
      )
    )

    act(() => {
      result.current.selectCard('2', true)
    })

    let lastCall = setSelectMock.mock.calls.pop()?.[0]
    if (typeof lastCall === 'function') {
      expect(lastCall(['1'])).toEqual(['1', '2'])
    }

    act(() => {
      result.current.selectCard('1', false)
    })

    lastCall = setSelectMock.mock.calls.pop()?.[0]
    if (typeof lastCall === 'function') {
      expect(lastCall(['1', '2'])).toEqual(['2'])
    }
  })

  it('removeCard удаляет из API и стора если isAuth', async () => {
    const { result } = renderHook(() =>
      useWishlistProductsActions(
        basketItems,
        wishlistProducts,
        ['1'],
        setSelectMock
      )
    )

    await act(async () => {
      await result.current.removeCard('1')
    })

    expect(deleteWishlistProductMock).toHaveBeenCalledWith('1')
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'wishlistProducts/removeProduct',
        payload: '1',
      })
    )
  })

  it('removeSelectCard удаляет несколько', async () => {
    const { result } = renderHook(() =>
      useWishlistProductsActions(
        basketItems,
        wishlistProducts,
        ['1', '2'],
        setSelectMock
      )
    )

    await act(async () => {
      await result.current.removeSelectCard()
    })

    expect(deleteWishlistProductsMock).toHaveBeenCalledWith(['1', '2'])
    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'wishlistProducts/removeProduct',
        payload: ['1', '2'],
      })
    )
  })

  it('addSelectedToBasket добавляет товары в корзину', async () => {
    const { result } = renderHook(() =>
      useWishlistProductsActions(
        basketItems,
        wishlistProducts,
        ['1'],
        setSelectMock
      )
    )

    await act(async () => {
      await result.current.addSelectedToBasket()
    })

    expect(addToBasketProductsMock).toHaveBeenCalledWith([
      { productId: '1', quantity: 1 },
    ])
    expect(dispatchMock).toHaveBeenCalledWith(
      basketProductsActions.addManyProducts(['1'])
    )
  })
})
