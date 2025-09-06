import { setQueryParams } from './setQueryParams'

describe('setQueryParams', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/test')
  })

  it('добавляет параметры в url', () => {
    setQueryParams({ a: '1', b: '2' })
    expect(window.location.search).toBe('?a=1&b=2')
  })

  it('обновляет существующие параметры', () => {
    window.history.pushState({}, '', '/test?a=1')
    setQueryParams({ a: '2', b: '3' })
    expect(window.location.search).toBe('?a=2&b=3')
  })

  it('удаляет параметр, если значение undefined', () => {
    window.history.pushState({}, '', '/test?a=1&b=2')
    setQueryParams({ b: undefined })
    expect(window.location.search).toBe('?a=1')
  })

  it('удаляет параметр, если значение пустая строка', () => {
    window.history.pushState({}, '', '/test?a=1&b=2')
    setQueryParams({ b: '' })
    expect(window.location.search).toBe('?a=1')
  })

  it('не изменяет pathname', () => {
    window.history.pushState({}, '', '/test/path?a=1')
    setQueryParams({ b: '2' })
    expect(window.location.pathname).toBe('/test/path')
  })
})
