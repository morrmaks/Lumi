import { renderHook } from '@testing-library/react'
import { useViewportHeightCssVar } from './useViewportHeightCssVar'

describe('useViewportHeightCssVar', () => {
  const setPropertyMock = jest.fn()
  const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
  const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')

  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(document.documentElement, 'style', {
      value: { setProperty: setPropertyMock },
      configurable: true,
    })
  })

  it('устанавливает css-переменную при маунте', () => {
    renderHook(() => useViewportHeightCssVar())

    expect(setPropertyMock).toHaveBeenCalledWith(
      '--app-vh',
      `${window.innerHeight * 0.01}px`
    )
  })

  it('добавляет и удаляет обработчик resize', () => {
    renderHook(() => useViewportHeightCssVar())

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )

    const { unmount } = renderHook(() => useViewportHeightCssVar())
    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'resize',
      expect.any(Function)
    )
  })

  it('обновляет css-переменную при resize', () => {
    renderHook(() => useViewportHeightCssVar())

    const resizeHandler = addEventListenerSpy.mock.calls.find(
      ([event]) => event === 'resize'
    )?.[1] as EventListener

    Object.defineProperty(window, 'innerHeight', {
      configurable: true,
      writable: true,
      value: 900,
    })
    resizeHandler(new Event('resize'))

    expect(setPropertyMock).toHaveBeenLastCalledWith('--app-vh', '9px')
  })
})
