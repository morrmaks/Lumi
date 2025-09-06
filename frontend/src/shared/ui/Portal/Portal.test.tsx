import React from 'react'
import { render, screen } from '@testing-library/react'
import { Portal } from './Portal'

describe('Portal', () => {
  it('рендерит контент в document.body по умолчанию', () => {
    render(
      <Portal>
        <div data-testid="child">Test content</div>
      </Portal>
    )
    const child = screen.getByTestId('child')
    expect(child).toBeInTheDocument()
    expect(child.parentElement).toBe(document.body)
  })

  it('рендерит контент в переданный элемент', () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    render(
      <Portal element={container}>
        <div data-testid="child">Test content</div>
      </Portal>
    )

    const child = screen.getByTestId('child')
    expect(child).toBeInTheDocument()
    expect(child.parentElement).toBe(container)
  })
})
