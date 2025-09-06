import { render, screen } from '@testing-library/react'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
  it('рендерится с базовым классом', () => {
    render(<Skeleton />)
    const element = screen.getByTestId('skeleton')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('skeleton')
  })

  it('применяет переданный className', () => {
    render(<Skeleton className="custom-class" />)
    const element = screen.getByTestId('skeleton')
    expect(element).toHaveClass('custom-class')
  })

  it('применяет width и height через style', () => {
    render(<Skeleton width="100px" height="50px" />)
    const element = screen.getByTestId('skeleton')
    expect(element).toHaveStyle({ width: '100px', height: '50px' })
  })

  it('применяет borderRadius через style', () => {
    render(<Skeleton border="10px" />)
    const element = screen.getByTestId('skeleton')
    expect(element).toHaveStyle({ borderRadius: '10px' })
  })
})
