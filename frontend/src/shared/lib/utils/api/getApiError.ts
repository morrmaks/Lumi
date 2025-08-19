import { SerializedError } from '@reduxjs/toolkit'
import { ApiError } from '@/shared/types'
import { Placeholders } from '@/shared/consts'

export const getApiError = (error: ApiError | SerializedError) => {
  const { defaultError } = Placeholders.shared.config
  if ('status' in error) {
    const { message, errors } = error.data || {}

    if (errors && Object.keys(errors).length > 0) {
      return Object.values(errors)
    }

    return message || defaultError
  }
  return error.message || defaultError
}
