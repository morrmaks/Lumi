import { render, screen, act } from '@testing-library/react'
import { Loader } from './Loader'

describe('Loader', () => {
  beforeEach(() => {
    jest.useFakeTimers({ legacyFakeTimers: false })
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('не отображается сразу после рендера', () => {
    render(<Loader delay={500} />)
    expect(screen.queryByTestId('loader')).toBeNull()
  })

  it('отображается после задержки', () => {
    render(<Loader delay={500} />)

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})
