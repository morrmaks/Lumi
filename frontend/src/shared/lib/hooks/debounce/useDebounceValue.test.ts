import { renderHook, act } from '@testing-library/react'
import { useDebounceValue } from './useDebounceValue'

jest.useFakeTimers()

describe('useDebounceValue', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('возвращает исходное значение сразу после монтирования', () => {
    const { result } = renderHook(() => useDebounceValue('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('обновляет значение после задержки', () => {
    let value = 'first'
    const { result, rerender } = renderHook(() => useDebounceValue(value, 300))

    value = 'second'
    rerender()

    expect(result.current).toBe('first')

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(result.current).toBe('second')
  })

  it('сбрасывает таймер при быстром обновлении значения', () => {
    let value = 0
    const { result, rerender } = renderHook(() => useDebounceValue(value, 200))

    act(() => {
      value = 1
      rerender()
      value = 2
      rerender()
      value = 3
      rerender()
    })
    act(() => {
      jest.advanceTimersByTime(199)
    })
    expect(result.current).toBe(0)

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(result.current).toBe(3)
  })

  it('очищает таймер при размонтировании', () => {
    const value = 'test'
    const { unmount } = renderHook(() => useDebounceValue(value, 200))

    act(() => {
      unmount()
      jest.advanceTimersByTime(200)
    })
  })
})
