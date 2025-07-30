import { AppRouter } from '@/app/providers/Router'
import { classNames } from '@/shared/lib/classNames'
import { NavBar } from '@/widgets/NavBar'
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint'
import { MobileNavBar } from '@/widgets/MobileNavBar'
import { DropdownMenu } from '@/entities/DropdownMenu'
import { useViewportHeightCssVar } from '@/shared/lib/hooks/useViewportHeight'
import { AppFooter } from '@/widgets/AppFooter'
import { BreadcrumbNav } from '@/features/BreadcrumbNav'

export const App = () => {
  useViewportHeightCssVar()
  const { md } = useBreakpoint()
  const isInited = true

  return (
    <div className={classNames('app', {}, [])}>
      <NavBar />
      {md ? null : <MobileNavBar />}
      {!md ? <DropdownMenu /> : null}
      <BreadcrumbNav />
      <div className={'contentPage'}>{isInited && <AppRouter />}</div>
      <AppFooter />
    </div>
  )
}
