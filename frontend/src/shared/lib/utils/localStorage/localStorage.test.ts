import { LocalStorage } from '@/shared/consts'
import { removeAccessToken, setAccessToken } from './localStorage'

describe('token utils', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('setAccessToken записывает токен в localStorage', () => {
    const token = 'test-token'
    const spy = jest.spyOn(Storage.prototype, 'setItem')
    setAccessToken(token)
    expect(spy).toHaveBeenCalledWith(LocalStorage.ACCESS_TOKEN, token)
  })

  it('removeAccessToken удаляет токен из localStorage', () => {
    const spy = jest.spyOn(Storage.prototype, 'removeItem')
    removeAccessToken()
    expect(spy).toHaveBeenCalledWith(LocalStorage.ACCESS_TOKEN)
  })
})
