import { renderHook, act } from '@testing-library/react'
import { useWishlistCardActions } from './useWishlistCardActions'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {
  basketProductsActions,
  useAddBasketProductMutation,
} from '@/features/Basket'

jest.mock('@/shared/lib/hooks')
jest.mock('@/features/Basket')

describe('useWishlistCardActions', () => {
  const dispatchMock = jest.fn()
  const addToBasketProductMock = jest.fn().mockResolvedValue(true)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
    ;(useAppSelector as jest.Mock).mockReturnValue(true) // isAuth = true
    ;(useAddBasketProductMutation as jest.Mock).mockReturnValue([
      addToBasketProductMock,
      { isLoading: false, reset: jest.fn() },
    ])
  })

  it('addToBasket вызывает api запрос и dispatch', async () => {
    const { result } = renderHook(() => useWishlistCardActions('1'))

    await act(async () => {
      await result.current.addToBasket()
    })

    expect(addToBasketProductMock).toHaveBeenCalledWith('1')
    expect(dispatchMock).toHaveBeenCalledWith(
      basketProductsActions.addProduct('1')
    )
  })

  it('addToBasket не вызывает api запрос, если isAuth=false', async () => {
    ;(useAppSelector as jest.Mock).mockReturnValue(false)

    const { result } = renderHook(() => useWishlistCardActions('1'))

    await act(async () => {
      await result.current.addToBasket()
    })

    expect(addToBasketProductMock).not.toHaveBeenCalled()
    expect(dispatchMock).toHaveBeenCalledWith(
      basketProductsActions.addProduct('1')
    )
  })
})
