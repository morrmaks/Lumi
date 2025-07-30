import { useLocation } from 'react-router-dom'
import { BreadcrumbMap } from '@/shared/consts/breadcrumbMap'
import { useAppSelector } from '@/shared/lib/hooks'
import { getBreadcrumbNavState } from '@/features/BreadcrumbNav/model/selectors/getBreadcrumbNavState'

export const useResolvedBreadcrumbs = () => {
  const { pathname } = useLocation()
  const breadcrumbState = useAppSelector(getBreadcrumbNavState)
  const pathnames = pathname.split('/').filter(Boolean)

  const crumbs = pathnames.map((segment, index) => {
    const isLast = index === pathnames.length - 1

    const path = '/' + pathnames.slice(0, index + 1).join('/')

    const name =
      BreadcrumbMap[segment as keyof typeof BreadcrumbMap] ||
      breadcrumbState[path] ||
      decodeURIComponent(segment)

    return {
      name,
      path,
      isLast,
    }
  })
  return crumbs
}
