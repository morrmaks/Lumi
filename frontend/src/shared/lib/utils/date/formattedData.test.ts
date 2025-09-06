import { formattedData } from './formattedData'

describe('formattedDate', () => {
  it('возвращает строку в формате "dd month yyyy г. в hh:mm"', () => {
    const input = '2025-09-01T14:30:00Z'
    const result = formattedData(input)

    expect(result).toMatch(/\d{2}\s[а-яА-Я]+\s\d{4}\sг\.\sв\s\d{2}:\d{2}/)
  })

  it('корректно форматирует разные даты', () => {
    const inputs = ['2025-01-01T00:00:00Z', '2025-12-31T23:59:00Z']

    inputs.forEach((date) => {
      const result = formattedData(date)
      expect(result).toMatch(/\d{2}\s[а-яА-Я]+\s\d{4}\sг\.\sв\s\d{2}:\d{2}/)
    })
  })
})
