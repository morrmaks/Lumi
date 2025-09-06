import { renderHook, act } from '@testing-library/react'
import { useDebounceCallback } from './useDebounceCallback'

jest.useFakeTimers()

describe('useDebounceCallback', () => {
  afterEach(() => {
    jest.clearAllTimers()
  })

  it('вызывает callback после указанной задержки', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounceCallback(callback, 500))

    act(() => {
      result.current('test')
    })

    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith('test')
  })

  it('сбрасывает таймер при повторном вызове до истечения задержки', () => {
    const callback = jest.fn()
    const { result } = renderHook(() => useDebounceCallback(callback, 300))

    act(() => {
      result.current(1)
      result.current(2)
      result.current(3)
    })

    act(() => {
      jest.advanceTimersByTime(299)
    })
    expect(callback).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1)
    })
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(3)
  })

  it('очищает таймер при размонтировании', () => {
    const callback = jest.fn()
    const { result, unmount } = renderHook(() =>
      useDebounceCallback(callback, 200)
    )

    act(() => {
      result.current('abc')
    })

    unmount()

    act(() => {
      jest.advanceTimersByTime(200)
    })
    expect(callback).not.toHaveBeenCalled()
  })
})
