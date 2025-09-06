import { render, screen, fireEvent } from '@testing-library/react'
import { Modal } from './Modal'
import React from 'react'

describe('Modal', () => {
  const onClose = jest.fn()
  let modalRoot: HTMLElement

  beforeAll(() => {
    modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal')
    document.body.appendChild(modalRoot)
  })

  beforeEach(() => {
    onClose.mockClear()
    modalRoot.innerHTML = ''
  })

  it('рендерится и показывает контент внутри', () => {
    render(
      <Modal onClose={onClose}>
        <div data-testid="child">Test content</div>
      </Modal>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it('закрывается при клике на фон', () => {
    render(
      <Modal onClose={onClose}>
        <div>Test content</div>
      </Modal>
    )
    fireEvent.click(screen.getByTestId('modal'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('не закрывается при клике на контейнер', () => {
    render(
      <Modal onClose={onClose}>
        <div data-testid="inner">Test content</div>
      </Modal>
    )
    fireEvent.click(screen.getByTestId('inner').parentElement!)
    expect(onClose).not.toHaveBeenCalled()
  })

  it('закрывается при клике на иконку', () => {
    render(
      <Modal onClose={onClose}>
        <div>Test content</div>
      </Modal>
    )
    fireEvent.click(screen.getByTestId('close-icon'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
