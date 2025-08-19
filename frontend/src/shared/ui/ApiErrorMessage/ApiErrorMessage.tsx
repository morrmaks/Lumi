import { ApiError } from '@/shared/types'
import { SerializedError } from '@reduxjs/toolkit'
import { classNames, getApiError } from '@/shared/lib/utils'
import cls from './ApiErrorMessage.module.less'

interface ApiErrorMessageProps {
  error?: ApiError | SerializedError
  className?: string
}

export const ApiErrorMessage = ({ error, className }: ApiErrorMessageProps) => {
  if (!error) return null

  const apiError = getApiError(error)
  const messages = Array.isArray(apiError) ? apiError : [apiError]

  return (
    <>
      {messages.map((message, index) => (
        <span
          key={index}
          className={classNames(cls.apiErrorMessage, {}, [className])}
        >
          {message}
        </span>
      ))}
    </>
  )
}
