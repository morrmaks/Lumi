import { AppRouter } from '@/app/providers/Router'
import { classNames } from '@/shared/lib/utils'
import { NavBar } from '@/widgets/NavBar'
import { useBreakpoint } from '@/shared/lib/hooks/useBreakpoint'
import { MobileNavBar } from '@/widgets/MobileNavBar'
import { DropdownMenu } from '@/entities/DropdownMenu'
import { useViewportHeightCssVar } from '@/shared/lib/hooks/useViewportHeight'
import { AppFooter } from '@/widgets/AppFooter'
import { BreadcrumbNav } from '@/features/BreadcrumbNav'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useEffect } from 'react'
import { wishlistProductsActions } from '@/features/WishlistProducts'
import { basketProductsActions } from '@/features/BasketProducts'

export const App = () => {
  const dispatch = useAppDispatch()
  useViewportHeightCssVar()
  const { md } = useBreakpoint()
  const isInited = true

  useEffect(() => {
    dispatch(wishlistProductsActions.addProduct(['1', '2', '3', '4', '5'])) //это будет происходить при инициализации приложения
    dispatch(basketProductsActions.addProduct({ id: '1', quantity: 1 })) //это будет происходить при инициализации приложения
  }, [dispatch])

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
