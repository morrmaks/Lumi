import { ReactNode, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks'
import { breadcrumbNavActions } from '@/features/BreadcrumbNav'
import cls from './PageLayout.module.less'
import { classNames } from '@/shared/lib/classNames'

interface PageLayoutProps {
  name?: string
  children?: ReactNode
  className?: string
  noPadding?: boolean
}

export const PageLayout = ({
  name,
  children,
  className,
  noPadding = false,
}: PageLayoutProps) => {
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (name) {
      dispatch(breadcrumbNavActions.setName({ path: pathname, name }))
    }
  }, [pathname, name])

  return (
    <section
      className={classNames(
        cls.pageLayout,
        { [cls.pageLayout__noPadding]: noPadding },
        [className]
      )}
    >
      {children}
    </section>
  )
}
