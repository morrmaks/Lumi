import { ApiErrorMessage } from './ApiErrorMessage'
import { render, screen } from '@testing-library/react'

describe('ApiErrorMessage', () => {
  it('ничего не рендерит, если error не передан', () => {
    const { container } = render(<ApiErrorMessage />)
    expect(container.firstChild).toBeNull()
  })

  it('рендерит только message', () => {
    render(
      <ApiErrorMessage
        error={{
          status: 400,
          data: { message: 'Что-то пошло не так' },
        }}
      />
    )

    expect(screen.getByText('Что-то пошло не так')).toBeInTheDocument()
    expect(screen.queryByRole('list')).not.toBeInTheDocument()
  })

  it('рендерит список ошибок', () => {
    const errors = { field1: 'Ошибка 1', field2: 'Ошибка 2' }

    render(
      <ApiErrorMessage
        error={{
          status: 400,
          data: { message: 'Ошибка запроса', errors: errors },
        }}
      />
    )

    expect(screen.getByText('Ошибка запроса')).toBeInTheDocument()
    Object.values(errors).forEach((err) => {
      expect(screen.getByText(err)).toBeInTheDocument()
    })
  })
})
