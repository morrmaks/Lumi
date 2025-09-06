import { render, screen, fireEvent } from '@testing-library/react'
import { Select, SelectOption } from './Select'

describe('Select', () => {
  const options: SelectOption<string>[] = [
    { value: 'a', content: 'Option A' },
    { value: 'b', content: 'Option B' },
  ]

  it('рендерится и показывает выбранное значение', () => {
    render(<Select value="a" options={options} onChange={jest.fn()} />)
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('открывает и закрывает список при клике на кнопку', () => {
    render(<Select value="a" options={options} onChange={jest.fn()} />)
    const button = screen.getByRole('button', { name: /Option A/i })

    expect(screen.queryByText('Option B')).not.toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.getByText('Option B')).toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.queryByText('Option B')).not.toBeInTheDocument()
  })

  it('вызывает onChange при выборе элемента', () => {
    const onChange = jest.fn()
    render(<Select value="a" options={options} onChange={onChange} />)
    const button = screen.getByRole('button', { name: /Option A/i })
    fireEvent.click(button)

    const optionB = screen.getByRole('button', { name: /Option B/i })
    fireEvent.click(optionB)

    expect(onChange).toHaveBeenCalledWith('b')
    expect(screen.queryByText('Option B')).not.toBeInTheDocument()
  })

  it('закрывает список при клике вне компонента', () => {
    render(
      <>
        <Select value="a" options={options} onChange={jest.fn()} />
        <div data-testid="outside">Outside</div>
      </>
    )
    const button = screen.getByRole('button', { name: /Option A/i })
    fireEvent.click(button)
    expect(screen.getByText('Option B')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByTestId('outside'))
    expect(screen.queryByText('Option B')).not.toBeInTheDocument()
  })
})
