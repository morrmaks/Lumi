import { renderHook } from '@testing-library/react'
import * as hooks from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { useCheckInBasket } from './useCheckInBasket'
import { useCheckInConfigurator } from './useCheckInConfigurator'
import { useCheckInWishlist } from './useCheckInWishlist'

describe('Custom check hooks', () => {
  const useAppSelectorMock = jest.spyOn(hooks, 'useAppSelector')

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('useCheckInBasket', () => {
    it('возвращает true, если товар есть в корзине', () => {
      useAppSelectorMock.mockReturnValue([{ productId: '1', quantity: 2 }])
      const { result } = renderHook(() => useCheckInBasket('1'))
      expect(result.current).toBe(true)
    })

    it('возвращает false, если товара нет в корзине', () => {
      useAppSelectorMock.mockReturnValue([{ productId: '2', quantity: 1 }])
      const { result } = renderHook(() => useCheckInBasket('1'))
      expect(result.current).toBe(false)
    })
  })

  describe('useCheckInConfigurator', () => {
    it('возвращает true, если компонент есть в конфигураторе', () => {
      useAppSelectorMock.mockReturnValue({ CPU: 'id-1', GPU: null })
      const { result } = renderHook(() => useCheckInConfigurator('id-1'))
      expect(result.current).toBe(true)
    })

    it('возвращает false, если компонента нет в конфигураторе', () => {
      useAppSelectorMock.mockReturnValue({ CPU: null, GPU: null })
      const { result } = renderHook(() => useCheckInConfigurator('id-1'))
      expect(result.current).toBe(false)
    })
  })

  describe('useCheckInWishlist', () => {
    it('возвращает true, если товар есть в избранном', () => {
      useAppSelectorMock.mockReturnValue(['1', '2'])
      const { result } = renderHook(() => useCheckInWishlist('1'))
      expect(result.current).toBe(true)
    })

    it('возвращает false, если товара нет в избранном', () => {
      useAppSelectorMock.mockReturnValue(['2', '3'])
      const { result } = renderHook(() => useCheckInWishlist('1'))
      expect(result.current).toBe(false)
    })
  })
})
