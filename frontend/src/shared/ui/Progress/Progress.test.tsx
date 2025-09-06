import { render, screen } from '@testing-library/react'
import { Progress } from './Progress'

describe('Progress', () => {
  it('рендерится', () => {
    render(<Progress value={50} />)
    const fill = screen.getByTestId('progressbar')
    expect(fill).toBeInTheDocument()
  })

  it('устанавливает ширину в соответствии с value', () => {
    render(<Progress value={75} />)
    const fill = screen.getByTestId('progressbar')
    expect(fill).toHaveStyle({ width: '75%' })
  })

  it('не превышает 100%', () => {
    render(<Progress value={150} />)
    const fill = screen.getByTestId('progressbar')
    expect(fill).toHaveStyle({ width: '100%' })
  })

  it('не опускается ниже 0%', () => {
    render(<Progress value={-20} />)
    const fill = screen.getByTestId('progressbar')
    expect(fill).toHaveStyle({ width: '0%' })
  })
})
