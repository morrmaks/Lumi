import { AppRouter } from '@/app/providers/Router'
import { classNames } from '@/shared/lib/utils'
import { NavBar } from '@/widgets/NavBar'
import { useBreakpoint } from '@/shared/lib/hooks'
import { MobileNavBar } from '@/widgets/MobileNavBar'
import { DropdownMenu } from '@/entities/DropdownMenu'
import { useViewportHeightCssVar } from '@/shared/lib/hooks'
import { AppFooter } from '@/widgets/AppFooter'
import { BreadcrumbNav } from '@/features/BreadcrumbNav'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useEffect } from 'react'
import { wishlistProductsActions } from '@/features/Wishlist'
import { basketProductsActions } from '@/features/Basket'
import { useGetMeQuery } from '@/entities/User/api'
import { getUserInited } from '@/entities/User'
import { Loader } from '@/shared/ui/Loader'

export const App = () => {
  const dispatch = useAppDispatch()
  useGetMeQuery()
  useViewportHeightCssVar()
  const { md } = useBreakpoint()
  const isInited = useAppSelector(getUserInited)

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
      <div className={'contentPage'}>
        {isInited ? <AppRouter /> : <Loader />}
      </div>
      <AppFooter />
    </div>
  )
}
