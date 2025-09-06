import { renderHook } from '@testing-library/react'
import { useResolvedBreadcrumbs } from './useResolvedBreadcrumbs'
import { BreadcrumbMap } from '@/shared/consts/breadcrumbMap'

// Мокаем модуль react-router-dom целиком
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
}))

// Мокаем хук useAppSelector
jest.mock('@/shared/lib/hooks', () => ({
  useAppSelector: jest.fn(),
}))

import { useLocation } from 'react-router-dom'
import { useAppSelector } from '@/shared/lib/hooks'

describe('useResolvedBreadcrumbs', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('генерирует breadcrumb из pathname и BreadcrumbMap', () => {
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/catalog',
      search: '',
      hash: '',
      state: null,
      key: 'test',
    })
    ;(useAppSelector as jest.Mock).mockReturnValue({})

    const { result } = renderHook(() => useResolvedBreadcrumbs())

    expect(result.current).toEqual([
      { name: BreadcrumbMap.catalog, path: '/catalog', isLast: true },
    ])
  })

  it('использует состояние из Redux, если нет в BreadcrumbMap', () => {
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/custom/path',
      search: '',
      hash: '',
      state: null,
      key: 'test',
    })
    ;(useAppSelector as jest.Mock).mockReturnValue({ '/custom': 'Custom Name' })

    const { result } = renderHook(() => useResolvedBreadcrumbs())

    expect(result.current).toEqual([
      { name: 'Custom Name', path: '/custom', isLast: false },
      { name: 'path', path: '/custom/path', isLast: true },
    ])
  })

  it('декодирует URI-компоненты, если нет ни в BreadcrumbMap, ни в Redux', () => {
    ;(useLocation as jest.Mock).mockReturnValue({
      pathname: '/hello%20world',
      search: '',
      hash: '',
      state: null,
      key: 'test',
    })
    ;(useAppSelector as jest.Mock).mockReturnValue({})

    const { result } = renderHook(() => useResolvedBreadcrumbs())

    expect(result.current).toEqual([
      { name: 'hello world', path: '/hello%20world', isLast: true },
    ])
  })
})
