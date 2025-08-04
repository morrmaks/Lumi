import { PageLayout } from '@/widgets/PageLayout'
import {
  getWishlistProductsState,
  WishlistProducts,
  wishlistProductsActions,
} from '@/features/WishlistProducts'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import cls from './WishlistPage.module.less'
import { useEffect } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'

const WishlistPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(wishlistProductsActions.addProduct(['1', '2', '3', '4', '5'])) //это будет происходить при инициализации приложения
  }, [dispatch])

  const { products } = useAppSelector(getWishlistProductsState)

  return (
    <PageLayout>
      <div className={cls.wishlistPage}>
        <div className={cls.wishlistPage__header}>
          <div>
            <h2 className={cls.wishlistPage__title}>Избранное</h2>
            <p className={cls.wishlistPage__description}>
              {`Товары, которые вас заинтересовали ${products.length ? ` (${products.length})` : ''}`}
            </p>
          </div>
        </div>
        {products.length > 0 ? (
          <WishlistProducts />
        ) : (
          <div className={cls.wishlistPage__emptyWishlist}>
            <Icon
              Svg={IconsMap.WISHLIST}
              className={cls.wishlistPage__emptyWishlist_icon}
            />
            <h3 className={cls.wishlistPage__emptyWishlist_title}>
              Список избранного пуст
            </h3>
            <p className={cls.wishlistPage__emptyWishlist_description}>
              Добавьте товары в избранное, чтобы не потерять
            </p>
            <AppLink to={getRouteCatalog()}>
              <Button theme={ButtonTheme.SECONDARY}>Перейти в каталог</Button>
            </AppLink>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default WishlistPage
