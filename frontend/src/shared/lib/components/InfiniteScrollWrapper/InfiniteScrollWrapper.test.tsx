import React from 'react'
import { render } from '@testing-library/react'
import { InfiniteScrollWrapper } from './InfiniteScrollWrapper'
import { UseInfiniteScrollOptions } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'

const mockUseInfiniteScroll = jest.fn()
jest.mock('@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll', () => ({
  useInfiniteScroll: (args: UseInfiniteScrollOptions) =>
    mockUseInfiniteScroll(args),
}))

describe('InfiniteScrollWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('рендерит дочерние элементы', () => {
    const { getByText } = render(
      <InfiniteScrollWrapper>
        <div>Child</div>
      </InfiniteScrollWrapper>
    )
    expect(getByText('Child')).toBeInTheDocument()
  })

  it('рендерит wrapper, если withWrapperScroll=true', () => {
    const { getByTestId } = render(
      <InfiniteScrollWrapper withWrapperScroll>
        <div>Child</div>
      </InfiniteScrollWrapper>
    )
    expect(getByTestId('wrapper')).toBeInTheDocument()
    expect(getByTestId('trigger')).toBeInTheDocument()
  })

  it('не рендерит wrapper, если withWrapperScroll=false', () => {
    const { queryByTestId, getByTestId } = render(
      <InfiniteScrollWrapper withWrapperScroll={false}>
        <div>Child</div>
      </InfiniteScrollWrapper>
    )
    expect(queryByTestId('wrapper')).toBeNull()
    expect(getByTestId('trigger')).toBeInTheDocument()
  })

  it('передает callback в useInfiniteScroll', () => {
    const callback = jest.fn()
    render(
      <InfiniteScrollWrapper onScrollEnd={callback}>
        <div>Child</div>
      </InfiniteScrollWrapper>
    )
    expect(mockUseInfiniteScroll).toHaveBeenCalledWith(
      expect.objectContaining({ callback })
    )
  })

  it('передает enabled в useInfiniteScroll', () => {
    render(
      <InfiniteScrollWrapper enabled={false}>
        <div>Child</div>
      </InfiniteScrollWrapper>
    )
    expect(mockUseInfiniteScroll).toHaveBeenCalledWith(
      expect.objectContaining({ enabled: false })
    )
  })
})
