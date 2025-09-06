import { fireEvent, render, screen } from '@testing-library/react'
import { BackButton } from './BackButton'
import { ButtonTheme } from '../Button'
import { useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('BackButton', () => {
  const mockedNavigate = jest.fn()
  beforeEach(() => {
    ;(useNavigate as jest.Mock).mockReturnValue(mockedNavigate)
    mockedNavigate.mockClear()
  })

  it('рендерит кнопку с текстом', () => {
    render(<BackButton>Go Back</BackButton>)
    expect(screen.getByText('Go Back')).toBeInTheDocument()
  })

  it('применяет className и theme', () => {
    render(
      <BackButton className="my-class" theme={ButtonTheme.PRIMARY}>
        Go Back
      </BackButton>
    )
    const button = screen.getByText('Go Back')
    expect(button).toHaveClass('my-class')
    expect(button).toHaveClass('primaryButton')
  })

  it('внутренняя навигация', () => {
    jest.spyOn(window.history, 'state', 'get').mockReturnValue({ idx: 1 })

    render(<BackButton>Назад</BackButton>)
    fireEvent.click(screen.getByText('Назад'))
    expect(mockedNavigate).toHaveBeenCalledWith(-1)
  })

  it('внешняя навигация', () => {
    jest.spyOn(window.history, 'state', 'get').mockReturnValue(null)
    jest
      .spyOn(document, 'referrer', 'get')
      .mockReturnValue('https://google.com')

    render(<BackButton>Назад</BackButton>)
    fireEvent.click(screen.getByText('Назад'))
    expect(mockedNavigate).toHaveBeenCalledWith('/')
  })
})
