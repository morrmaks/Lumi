import { PageLayout } from '@/widgets/PageLayout'
import { getWishlistProducts, WishlistProducts } from '@/features/Wishlist'
import { useAppSelector } from '@/shared/lib/hooks'
import cls from './WishlistPage.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import { Loader } from '@/shared/ui/Loader'
import { Suspense } from 'react'
import { Placeholders } from '@/shared/consts'

const WishlistPage = () => {
  const products = useAppSelector(getWishlistProducts)

  return (
    <PageLayout>
      <div className={cls.wishlistPage}>
        <div className={cls.wishlistPage__header}>
          <div>
            <h2 className={cls.wishlistPage__title}>
              {Placeholders.pages.wishlist.mainText}
            </h2>
            <p className={cls.wishlistPage__description}>
              {`${Placeholders.pages.wishlist.describeText} ${products.length ? ` (${products.length})` : ''}`}
            </p>
          </div>
        </div>
        {products.length > 0 ? (
          <Suspense fallback={<Loader />}>
            <WishlistProducts />
          </Suspense>
        ) : (
          <div className={cls.wishlistPage__emptyWishlist}>
            <Icon
              Svg={IconsMap.WISHLIST}
              className={cls.wishlistPage__emptyWishlist_icon}
            />
            <h3 className={cls.wishlistPage__emptyWishlist_title}>
              {Placeholders.pages.wishlist.empty.mainText}
            </h3>
            <p className={cls.wishlistPage__emptyWishlist_description}>
              {Placeholders.pages.wishlist.empty.describeText}
            </p>
            <AppLink to={getRouteCatalog()}>
              <Button theme={ButtonTheme.SECONDARY}>
                {Placeholders.pages.wishlist.empty.onRouteCatalog}
              </Button>
            </AppLink>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default WishlistPage
