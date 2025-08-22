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
import { useGetMeQuery } from '@/entities/User/api'
import { getUserInited, getUserIsAuth } from '@/entities/User'
import { Loader } from '@/shared/ui/Loader'
import {
  useAddWishlistProductsMutation,
  useGetWishlistQuery,
} from '@/features/Wishlist/api/wishlistApi'
import { initConfigurator, initWishlist } from '@/app/lib'
import {
  useAddBasketProductsMutation,
  useGetBasketQuery,
} from '@/features/Basket'
import { initBasket } from '@/app/lib'
import {
  useGetConfigureQuery,
  useSetConfigureMutation,
} from '@/features/Configurator/api'

export const App = () => {
  useViewportHeightCssVar()
  const { md } = useBreakpoint()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getUserIsAuth)
  const isInited = useAppSelector(getUserInited)

  const { data: user } = useGetMeQuery()
  const { data: wishlistProductIds } = useGetWishlistQuery(undefined, {
    skip: !isAuth,
  })
  const [addToWishlist] = useAddWishlistProductsMutation()
  const [addToBasket] = useAddBasketProductsMutation()
  const { data: basketProductIds } = useGetBasketQuery(undefined, {
    skip: !isAuth,
  })
  const { data: configuratorComponents } = useGetConfigureQuery(undefined, {
    skip: !isAuth,
  })
  const [setConfigurator] = useSetConfigureMutation()

  useEffect(() => {
    initWishlist(isAuth, wishlistProductIds, addToWishlist, dispatch)
  }, [isAuth, wishlistProductIds, dispatch])

  useEffect(() => {
    initBasket(isAuth, basketProductIds, addToBasket, dispatch)
  }, [isAuth, basketProductIds, dispatch])

  useEffect(() => {
    initConfigurator(isAuth, configuratorComponents, setConfigurator, dispatch)
  }, [isAuth, configuratorComponents, dispatch])

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
