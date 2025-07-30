import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks'
import { breadcrumbNavActions } from '@/features/BreadcrumbNav'
import cls from './PageLayout.module.less'

interface PageLayoutProps {
  name?: string
  children?: ReactNode
}

export const PageLayout = ({ name, children }: PageLayoutProps) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (name) {
      dispatch(breadcrumbNavActions.setName({ path: pathname, name }))
    }
  }, [pathname, name])

  return <section className={cls.pageLayout}>{children}</section>
}
