import { getQueryParams } from './getQueryParams'

describe('getQueryParams', () => {
  beforeEach(() => {
    window.history.pushState({}, '', 'http://localhost/test')
  })

  it('добавляет параметры в пустой search', () => {
    const result = getQueryParams({ a: '1', b: '2' })
    expect(result).toBe('a=1&b=2')
  })

  it('обновляет существующие параметры', () => {
    window.history.pushState({}, '', '/?a=old&c=3')
    const result = getQueryParams({ a: 'new', b: '2' })
    expect(result).toBe('a=new&c=3&b=2')
  })

  it('удаляет параметры с undefined или пустым значением', () => {
    window.history.pushState({}, '', '/?a=1&b=2&c=3')
    const result = getQueryParams({ a: undefined, b: '' })
    expect(result).toBe('c=3')
  })

  it('ничего не делает, если нет изменений', () => {
    window.history.pushState({}, '', '/?x=1')
    const result = getQueryParams({})
    expect(result).toBe('x=1')
  })
})
