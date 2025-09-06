import { Button, ButtonTheme, ButtonSize } from './Button'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

describe('Button', () => {
  it('рендерит текст', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText(/click me/i)).toBeInTheDocument()
  })

  it('можно задать theme', () => {
    render(<Button theme={ButtonTheme.OUTLINE}>Outline</Button>)
    const button = screen.getByText(/outline/i)
    expect(button).toHaveClass('outlineButton')
  })

  it('можно задать size', () => {
    render(<Button size={ButtonSize.L}>Big</Button>)
    const button = screen.getByText(/big/i)
    expect(button).toHaveClass('size_l')
  })

  it('disabled работает', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText(/disabled/i) as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it('onClick срабатывает', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Press</Button>)
    await userEvent.click(screen.getByText(/press/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('добавляет кастомный className', () => {
    render(<Button className="custom-class">With class</Button>)
    const button = screen.getByText(/with class/i)
    expect(button).toHaveClass('custom-class')
  })
})
