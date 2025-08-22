import { ApiError } from '@/shared/types'
import { SerializedError } from '@reduxjs/toolkit'
import { getApiError } from '@/shared/lib/utils'
import cls from './ApiErrorMessage.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts'

interface ApiErrorMessageProps {
  error?: ApiError | SerializedError
}

export const ApiErrorMessage = ({ error }: ApiErrorMessageProps) => {
  if (!error) return null

  const { message, errors } = getApiError(error)

  return (
    <div className={cls.apiErrorMessage}>
      <div className={cls.apiErrorMessage__header}>
        <Icon Svg={IconsMap.ERROR} className={cls.apiErrorMessage__icon} />
        <h4 className={cls.apiErrorMessage__title}>{message}</h4>
      </div>
      {errors && (
        <ul className={cls.apiErrorMessage__errors}>
          {errors.map((message, index) => (
            <li key={index} className={cls.apiErrorMessage__error}>
              {message}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
