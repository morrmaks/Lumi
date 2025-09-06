import { SerializedError } from '@reduxjs/toolkit'
import { getApiError } from './getApiError'
import { ApiError } from '@/shared/types'
import { Placeholders } from '@/shared/consts'

describe('getApiError', () => {
  const defaultError = Placeholders.shared.config.defaultError

  it('возвращает сообщение по умолчанию, если передан SerializedError без message', () => {
    const error: SerializedError = {}
    expect(getApiError(error)).toEqual({
      message: defaultError,
      errors: undefined,
    })
  })

  it('возвращает сообщение из SerializedError, если оно есть', () => {
    const error: SerializedError = { message: 'Some error' }
    expect(getApiError(error)).toEqual({
      message: 'Some error',
      errors: undefined,
    })
  })

  it('возвращает message из ApiError, если ошибок нет', () => {
    const error: ApiError = { status: 400, data: { message: 'API failed' } }
    expect(getApiError(error)).toEqual({
      message: 'API failed',
      errors: undefined,
    })
  })

  it('возвращает ошибки из ApiError, если они есть', () => {
    const error: ApiError = {
      status: 400,
      data: {
        message: 'API failed',
        errors: {
          field1: 'Error 1',
          field2: 'Error 2',
        },
      },
    }
    expect(getApiError(error)).toEqual({
      message: 'API failed',
      errors: ['Error 1', 'Error 2'],
    })
  })

  it('возвращает сообщение по умолчанию, если ApiError без message', () => {
    const error: ApiError = { status: 400, data: { message: '' } }
    expect(getApiError(error)).toEqual({
      message: defaultError,
      errors: undefined,
    })
  })
})
