import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox, CheckboxType } from './Checkbox'

describe('Checkbox', () => {
  it('рендерится с type=check по умолчанию', () => {
    render(<Checkbox onChange={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByTestId('icon-check-mark')).toBeInTheDocument()
  })

  it('рендерится с type=toggle', () => {
    render(<Checkbox checkboxType={CheckboxType.TOGGLE} onChange={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
    expect(screen.getByRole('checkbox').querySelector('span')).toHaveClass(
      'checkbox__thumb'
    )
  })

  it('использует defaultChecked в неконтролируемом режиме', () => {
    render(<Checkbox defaultChecked onChange={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })

  it('переключается в неконтролируемом режиме и вызывает onChange', () => {
    const onChange = jest.fn()
    render(<Checkbox defaultChecked={false} onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledWith(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
  })

  it('не меняет состояние в контролируемом режиме, только вызывает onChange', () => {
    const onChange = jest.fn()
    render(<Checkbox checked={false} onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledWith(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
  })

  it('работает как controlled при checked=true', () => {
    render(<Checkbox checked={true} onChange={jest.fn()} />)
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
  })
})
