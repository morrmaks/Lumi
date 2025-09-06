import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeSwitcher } from './ThemeSwitcher'
import { Theme, useTheme } from '@/app/providers/ThemeProvider'

jest.mock('@/app/providers/ThemeProvider', () => {
  const actual = jest.requireActual('@/app/providers/ThemeProvider')
  return {
    ...actual,
    useTheme: jest.fn(),
  }
})

jest.mock('@/shared/lib/hooks', () => ({
  useAppSelector: jest.fn(),
}))

describe('ThemeSwitcher', () => {
  const toggleThemeMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: Theme.LIGHT,
      toggleTheme: toggleThemeMock,
    })
  })

  test('рендерит светлую иконку по умолчанию', () => {
    render(<ThemeSwitcher />)
    expect(screen.getByTestId('light-icon')).toBeInTheDocument()
  })

  test('переключает тему при клике', () => {
    render(<ThemeSwitcher />)
    fireEvent.click(screen.getByTestId('theme-switcher'))
    expect(toggleThemeMock).toHaveBeenCalled()
  })

  test('рендерит тёмную иконку если theme = DARK', () => {
    ;(useTheme as jest.Mock).mockReturnValue({
      theme: Theme.DARK,
      toggleTheme: toggleThemeMock,
    })

    render(<ThemeSwitcher />)
    expect(screen.getByTestId('dark-icon')).toBeInTheDocument()
  })

  test('выполняет внешний onClick', () => {
    const onClickMock = jest.fn()
    render(<ThemeSwitcher onClick={onClickMock} />)
    fireEvent.click(screen.getByTestId('theme-switcher'))
    expect(onClickMock).toHaveBeenCalled()
  })
})
