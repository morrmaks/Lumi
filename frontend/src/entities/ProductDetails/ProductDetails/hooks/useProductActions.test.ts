import { renderHook, act } from '@testing-library/react'
import { useProductActions } from './useProductActions'
import {
  useAppDispatch,
  useAppSelector,
  useCheckInBasket,
  useCheckInWishlist,
  useCheckInConfigurator,
} from '@/shared/lib/hooks'
import { basketProductsActions } from '@/features/Basket'
import { wishlistProductsActions } from '@/features/Wishlist'
import { configuratorComponentsActions } from '@/features/Configurator'
import {
  useAddWishlistProductMutation,
  useDeleteWishlistProductMutation,
} from '@/features/Wishlist/api/wishlistApi'
import { useAddBasketProductMutation } from '@/features/Basket'
import {
  useAddConfigureComponentMutation,
  useDeleteConfigureComponentMutation,
} from '@/features/Configurator/api'

jest.mock('@/shared/lib/hooks')
jest.mock('@/features/Wishlist/api/wishlistApi')
jest.mock('@/features/Basket')
jest.mock('@/features/Configurator/api')

describe('useProductActions', () => {
  const dispatchMock = jest.fn()
  const addWishlistMock = jest.fn().mockResolvedValue(true)
  const deleteWishlistMock = jest.fn().mockResolvedValue(true)
  const addBasketMock = jest.fn().mockResolvedValue(true)
  const addConfiguratorMock = jest.fn().mockResolvedValue(true)
  const deleteConfiguratorMock = jest.fn().mockResolvedValue(true)

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useAppDispatch as jest.Mock).mockReturnValue(dispatchMock)
    ;(useAppSelector as jest.Mock).mockReturnValue(true) // isAuth = true
    ;(useCheckInBasket as jest.Mock).mockReturnValue(false)
    ;(useCheckInWishlist as jest.Mock).mockReturnValue(false)
    ;(useCheckInConfigurator as jest.Mock).mockReturnValue(false)
    ;(useAddWishlistProductMutation as jest.Mock).mockReturnValue([
      addWishlistMock,
      { isLoading: false, reset: jest.fn() },
    ])
    ;(useDeleteWishlistProductMutation as jest.Mock).mockReturnValue([
      deleteWishlistMock,
      { isLoading: false, reset: jest.fn() },
    ])
    ;(useAddBasketProductMutation as jest.Mock).mockReturnValue([
      addBasketMock,
      { isLoading: false, reset: jest.fn() },
    ])
    ;(useAddConfigureComponentMutation as jest.Mock).mockReturnValue([
      addConfiguratorMock,
      { isLoading: false, reset: jest.fn() },
    ])
    ;(useDeleteConfigureComponentMutation as jest.Mock).mockReturnValue([
      deleteConfiguratorMock,
      { isLoading: false, reset: jest.fn() },
    ])
  })

  it('handleAddToBasket добавляет товар и вызывает dispatch', async () => {
    const { result } = renderHook(() => useProductActions('1'))
    await act(async () => {
      await result.current.handleAddToBasket()
    })
    expect(addBasketMock).toHaveBeenCalledWith('1')
    expect(dispatchMock).toHaveBeenCalledWith(
      basketProductsActions.addProduct('1')
    )
  })

  it('handleToggleWishlist добавляет и удаляет товар из wishlist', async () => {
    const { result } = renderHook(() => useProductActions('1'))
    await act(async () => {
      await result.current.handleToggleWishlist()
    })
    expect(addWishlistMock).toHaveBeenCalledWith('1')
    expect(dispatchMock).toHaveBeenCalledWith(
      wishlistProductsActions.addProduct('1')
    )
  })

  it('handleToggleConfigurator добавляет и удаляет компонент', async () => {
    const { result } = renderHook(() => useProductActions('1', 'processor'))
    await act(async () => {
      await result.current.handleToggleConfigurator()
    })
    expect(addConfiguratorMock).toHaveBeenCalledWith('1')
    expect(dispatchMock).toHaveBeenCalledWith(
      configuratorComponentsActions.setComponent({
        componentType: 'processor',
        componentId: '1',
      })
    )
  })
})
