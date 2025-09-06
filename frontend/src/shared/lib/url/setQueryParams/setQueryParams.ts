import { getQueryParams } from '../getQueryParams/getQueryParams'

export const setQueryParams = (params: Record<string, string | undefined>) => {
  const queryParams = getQueryParams(params)
  const newUrl = queryParams
    ? `${window.location.pathname}?${queryParams}`
    : window.location.pathname
  window.history.pushState(null, '', newUrl)
}
