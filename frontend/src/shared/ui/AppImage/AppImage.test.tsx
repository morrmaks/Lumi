import { act, fireEvent, render, screen } from '@testing-library/react'
import { AppImage } from './AppImage'
import { Skeleton } from '@/shared/ui/Skeleton'

jest.mock('@/shared/ui/Skeleton', () => ({
  Skeleton: ({ 'data-testid': testid }: { 'data-testid': string }) => (
    <div data-testid={testid} />
  ),
}))

jest.mock('@/shared/ui/Icon', () => ({
  Icon: ({ 'data-testid': testid }: { 'data-testid'?: string }) => (
    <div data-testid={testid} />
  ),
}))

describe('AppImage', () => {
  const src = 'https://example.com/image.png'
  const alt = 'test image'

  let OriginalImage: typeof Image

  beforeAll(() => {
    OriginalImage = global.Image
  })

  afterAll(() => {
    global.Image = OriginalImage
  })

  beforeEach(() => {
    jest.useFakeTimers()

    class MockImage {
      onload: (() => void) | null = null
      onerror: (() => void) | null = null
      private _src = ''

      set src(value: string) {
        this._src = value
        setTimeout(() => {
          act(() => {
            if (value.includes('fail')) {
              this.onerror?.()
            } else {
              this.onload?.()
            }
          })
        }, 0)
      }

      get src() {
        return this._src
      }
    }

    global.Image = MockImage as unknown as typeof Image
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.resetAllMocks()
  })

  it('показывает Skeleton при загрузке', () => {
    render(<AppImage src={src} alt={alt} />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('отображает картинку после успешной загрузки', () => {
    render(<AppImage src={src} alt={alt} />)

    act(() => {
      jest.runAllTimers()
    })

    const image = screen.getByTestId('app-image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', src)
    expect(image).toHaveAttribute('alt', alt)
  })

  it('отображает errorFallback при ошибке загрузки', () => {
    render(<AppImage src="fail.png" alt={alt} />)

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument()
  })

  it('вызывает onClick при клике на картинку', () => {
    const onClick = jest.fn()
    render(<AppImage src={src} alt={alt} onClick={onClick} />)

    act(() => {
      jest.runAllTimers()
    })

    const image = screen.getByTestId('app-image')
    fireEvent.click(image)
    expect(onClick).toHaveBeenCalledWith(src, 0)
  })

  it('показывает кастомный fallback', () => {
    render(
      <AppImage
        src={src}
        alt={alt}
        fallback={<Skeleton data-testid="skeleton" />}
      />
    )
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('показывает кастомный errorFallback', () => {
    render(
      <AppImage
        src="fail.png"
        alt={alt}
        errorFallback={<div data-testid="error-fallback" />}
      />
    )

    act(() => {
      jest.runAllTimers()
    })

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument()
  })
})
