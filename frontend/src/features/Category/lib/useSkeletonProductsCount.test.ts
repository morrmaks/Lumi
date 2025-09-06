import { renderHook } from '@testing-library/react'
import { useSkeletonProductsCount } from './useSkeletonProductsCount'
import { useBreakpoint } from '@/shared/lib/hooks'

jest.mock('@/shared/lib/hooks', () => ({
  useBreakpoint: jest.fn(),
}))

describe('useSkeletonProductsCount', () => {
  const useBreakpointMock = useBreakpoint as jest.Mock

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('возвращает 4, если md=true', () => {
    useBreakpointMock.mockReturnValue({
      sm: true,
      md: true,
      lg: true,
      xl: false,
    })
    const { result } = renderHook(() => useSkeletonProductsCount())
    expect(result.current).toBe(4)
  })

  it('возвращает 3, если sm=true и md=false', () => {
    useBreakpointMock.mockReturnValue({
      sm: true,
      md: false,
      lg: false,
      xl: false,
    })
    const { result } = renderHook(() => useSkeletonProductsCount())
    expect(result.current).toBe(3)
  })

  it('возвращает 2, если ни sm, ни md не активны', () => {
    useBreakpointMock.mockReturnValue({
      sm: false,
      md: false,
      lg: true,
      xl: true,
    })
    const { result } = renderHook(() => useSkeletonProductsCount())
    expect(result.current).toBe(2)
  })
})
