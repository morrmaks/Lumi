import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  it('рендерится без иконки', () => {
    render(<Input onChangeString={jest.fn()} />)
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.queryByTestId('input-icon')).toBeNull()
  })

  it('рендерится с иконкой', () => {
    render(<Input icon="PAYMENT" onChangeString={jest.fn()} />)
    expect(screen.getByTestId('input-icon')).toBeInTheDocument()
  })

  it('применяет className и disabled', () => {
    render(<Input className="my-input" disabled onChangeString={jest.fn()} />)
    const input = screen.getByTestId('input')
    expect(input).toHaveClass('my-input')
    expect(input).toBeDisabled()
  })

  it('вызывает onChangeString при вводе текста', () => {
    const handleChange = jest.fn()
    render(<Input onChangeString={handleChange} />)
    const input = screen.getByTestId('input')
    fireEvent.change(input, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledWith('test')
  })

  it('вызывает onChangeFile при выборе файла', () => {
    const handleChangeFile = jest.fn()
    render(<Input type="file" onChangeFile={handleChangeFile} />)
    const input = screen.getByTestId('input')
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' })
    fireEvent.change(input, { target: { files: [file] } })
    expect(handleChangeFile).toHaveBeenCalledWith(file)
  })

  it('вызывает onIconClick при клике на иконку', () => {
    const handleIconClick = jest.fn()
    render(
      <Input
        icon="PAYMENT"
        onIconClick={handleIconClick}
        onChangeString={jest.fn()}
      />
    )
    const icon = screen.getByTestId('input-icon')
    fireEvent.click(icon)
    expect(handleIconClick).toHaveBeenCalledTimes(1)
  })
})
