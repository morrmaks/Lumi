export const getQueryParams = (
  params: Record<string, string | undefined>
): string => {
  const searchParams = new URLSearchParams(window.location.search)

  Object.entries(params).forEach(([name, value]) => {
    if (value === undefined || value === '') {
      searchParams.delete(name)
    } else {
      searchParams.set(name, value)
    }
  })

  return searchParams.toString()
}

export const setQueryParams = (params: Record<string, string | undefined>) => {
  const queryParams = getQueryParams(params)
  const newUrl = queryParams
    ? `${window.location.pathname}?${queryParams}`
    : window.location.pathname
  window.history.pushState(null, '', newUrl)
}
