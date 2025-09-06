import { renderHook } from '@testing-library/react'
import { useInfiniteScroll } from './useInfiniteScroll'

describe('useInfiniteScroll', () => {
  let observeMock: jest.Mock
  let unobserveMock: jest.Mock

  beforeEach(() => {
    observeMock = jest.fn()
    unobserveMock = jest.fn()

    class MockIntersectionObserver {
      constructor(private callback: IntersectionObserverCallback) {}
      observe = observeMock
      unobserve = unobserveMock
      disconnect = jest.fn()
      takeRecords = jest.fn().mockReturnValue([])
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    })
  })

  it('не вызывает callback если enabled=false', () => {
    const callback = jest.fn()
    const wrapperRef = { current: null }
    const triggerRef = { current: document.createElement('div') }

    renderHook(() =>
      useInfiniteScroll({
        callback,
        wrapperRef,
        triggerRef,
        enabled: false,
      })
    )

    expect(observeMock).not.toHaveBeenCalled()
  })

  it('вызывает observe при монтировании', () => {
    const callback = jest.fn()
    const wrapperRef = { current: document.createElement('div') }
    const triggerRef = { current: document.createElement('div') }

    renderHook(() =>
      useInfiniteScroll({
        callback,
        wrapperRef,
        triggerRef,
        enabled: true,
      })
    )

    expect(observeMock).toHaveBeenCalledWith(triggerRef.current)
  })

  it('вызывает unobserve при размонтировании', () => {
    const callback = jest.fn()
    const wrapperRef = { current: document.createElement('div') }
    const triggerRef = { current: document.createElement('div') }

    const { unmount } = renderHook(() =>
      useInfiniteScroll({
        callback,
        wrapperRef,
        triggerRef,
        enabled: true,
      })
    )

    unmount()
    expect(unobserveMock).toHaveBeenCalledWith(triggerRef.current)
  })
})
