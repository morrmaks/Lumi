import { render, screen } from '@testing-library/react'
import { ExternalLink } from './ExternalLink'

describe('ExternalLink', () => {
  it('рендерит ссылку с children', () => {
    render(<ExternalLink href="https://example.com">Click me</ExternalLink>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('добавляет href и обязательные атрибуты', () => {
    render(<ExternalLink href="https://example.com">Link</ExternalLink>)
    const link = screen.getByText('Link')

    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('применяет className', () => {
    render(
      <ExternalLink href="https://example.com" className="custom-class">
        Styled Link
      </ExternalLink>
    )
    const link = screen.getByText('Styled Link')
    expect(link).toHaveClass('custom-class')
  })

  it('прокидывает остальные пропсы', () => {
    render(
      <ExternalLink href="https://example.com" id="external-id">
        Test Link
      </ExternalLink>
    )
    const link = screen.getByTestId('external-link')
    expect(link).toHaveAttribute('id', 'external-id')
  })
})
