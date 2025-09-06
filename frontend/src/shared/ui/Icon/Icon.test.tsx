import { render, screen, fireEvent } from '@testing-library/react'
import { Icon } from './Icon'
import { IconTheme } from '@/shared/consts'

const MockSvg = (props: React.SVGProps<SVGSVGElement>) => <svg {...props} />

describe('Icon', () => {
  test('рендерит переданный Svg', () => {
    render(<Icon Svg={MockSvg} />)
    const svg = screen.getByTestId('svg-icon')
    expect(svg).toBeInTheDocument()
    expect(svg.tagName).toBe('svg')
  })

  test('применяет className и theme', () => {
    render(
      <Icon Svg={MockSvg} className="my-class" theme={IconTheme.PRIMARY} />
    )
    const svg = screen.getByTestId('svg-icon')
    expect(svg).toHaveClass('my-class')
    expect(svg).toHaveClass('primary')
  })

  test('вызывает onClick', () => {
    const handleClick = jest.fn()
    render(<Icon Svg={MockSvg} onClick={handleClick} />)
    const svg = screen.getByTestId('svg-icon')
    fireEvent.click(svg)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
