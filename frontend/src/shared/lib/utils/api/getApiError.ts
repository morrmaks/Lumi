import { SerializedError } from '@reduxjs/toolkit'
import { ApiError } from '@/shared/types'
import { Placeholders } from '@/shared/consts'

export const getApiError = (error: ApiError | SerializedError) => {
  const { defaultError } = Placeholders.shared.config
  const errorList: string[] = []

  if ('status' in error) {
    const { message, errors } = error.data || {}

    if (errors && Object.keys(errors).length > 0) {
      errorList.push(...Object.values(errors))
    }
    return {
      message: message || defaultError,
      errors: errorList.length > 0 ? errorList : undefined,
    }
  }
  return { message: error.message || defaultError, errors: undefined }
}
