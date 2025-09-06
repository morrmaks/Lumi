import { renderHook } from '@testing-library/react'
import { useBreakpoint } from './useBreakpoint'

describe('useBreakpoint', () => {
  const originalMatchMedia = window.matchMedia

  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
    window.matchMedia = originalMatchMedia
  })

  it('возвращает false для всех брейкпоинтов по умолчанию', () => {
    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toEqual({
      sm: false,
      md: false,
      lg: false,
      xl: false,
    })
  })

  it('возвращает true для sm и md, если matches установлены', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches:
          query === '(min-width: 640px)' || query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }
    })

    const { result } = renderHook(() => useBreakpoint())
    expect(result.current).toEqual({ sm: true, md: true, lg: false, xl: false })
  })

  it('добавляет и удаляет слушатели при монтировании и размонтировании', () => {
    const addEventListenerMock = jest.fn()
    const removeEventListenerMock = jest.fn()

    window.matchMedia = jest.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
      dispatchEvent: jest.fn(),
    }))

    const { unmount } = renderHook(() => useBreakpoint())

    expect(addEventListenerMock).toHaveBeenCalledTimes(4)

    unmount()

    expect(removeEventListenerMock).toHaveBeenCalledTimes(4)
  })
})
