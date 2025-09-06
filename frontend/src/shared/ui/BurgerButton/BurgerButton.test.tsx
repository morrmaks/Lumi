import { fireEvent, render, screen } from '@testing-library/react'
import { useAppDispatch } from '@/shared/lib/hooks'
import { BurgerButton } from './BurgerButton'
import { slideMenuActions } from '@/entities/SlideMenu'

jest.mock('@/shared/lib/hooks', () => ({
  useAppDispatch: jest.fn(),
}))

describe('BurgerButton', () => {
  const mockDispatch = jest.fn()

  beforeEach(() => {
    jest.resetAllMocks()
    ;(useAppDispatch as jest.Mock).mockReturnValue(mockDispatch)
  })

  it('рендерит кнопку', () => {
    render(<BurgerButton isOpen={false} />)
    const button = screen.getByTestId('burger-button')
    expect(button).toBeInTheDocument()
  })

  it('добавляет класс анимации, если isOpen = true', () => {
    render(<BurgerButton isOpen={true} />)
    const button = screen.getByTestId('burger-button')
    expect(button).toHaveClass('burgerButton_open')
  })

  it('вызывает dispatch с правильным payload при клике', () => {
    render(<BurgerButton isOpen={false} />)
    const button = screen.getByTestId('burger-button')
    fireEvent.click(button)
    expect(mockDispatch).toHaveBeenCalledWith(slideMenuActions.setIsOpen(true))
  })

  it('вызывает dispatch с false, если isOpen = true', () => {
    render(<BurgerButton isOpen={true} />)
    const button = screen.getByTestId('burger-button')
    fireEvent.click(button)
    expect(mockDispatch).toHaveBeenCalledWith(slideMenuActions.setIsOpen(false))
  })
})
