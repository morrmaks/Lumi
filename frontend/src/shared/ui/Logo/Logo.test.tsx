import { render, screen } from '@testing-library/react'
import { Logo } from './Logo'
import { MemoryRouter } from 'react-router-dom'

describe('Logo', () => {
  it('рендерится', () => {
    render(
      <MemoryRouter>
        <Logo />
      </MemoryRouter>
    )
    expect(screen.getByTestId('logo')).toBeInTheDocument()
  })
})
