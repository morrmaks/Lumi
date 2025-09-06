import { render, screen } from '@testing-library/react'
import { AppLink } from './AppLink'
import { MemoryRouter } from 'react-router-dom'

describe('AppLink', () => {
  const linkText = 'Click me'
  const to = '/test'

  it('рендерит ссылку с текстом', () => {
    render(
      <MemoryRouter>
        <AppLink to={to}>{linkText}</AppLink>
      </MemoryRouter>
    )

    const link = screen.getByText(linkText)
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', to)
  })

  it('применяет кастомный className и theme', () => {
    render(
      <MemoryRouter>
        <AppLink to={to} className={'my-class'} theme={'dark'}>
          {linkText}
        </AppLink>
      </MemoryRouter>
    )

    const link = screen.getByText(linkText)
    expect(link).toHaveClass('my-class')
    expect(link).toHaveClass('dark')
  })
})
