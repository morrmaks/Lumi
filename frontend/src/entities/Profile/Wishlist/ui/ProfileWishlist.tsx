import cls from './ProfileWishlist.module.less'
import { getWishlistProducts, WishlistProducts } from '@/features/Wishlist'
import { useAppSelector } from '@/shared/lib/hooks'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Loader } from '@/shared/ui/Loader'
import { Suspense } from 'react'
import { Placeholders } from '@/shared/consts'

export const ProfileWishlist = () => {
  const products = useAppSelector(getWishlistProducts)

  return (
    <div className={cls.profileWishlist}>
      <div className={cls.profileWishlist__header}>
        <Icon
          Svg={IconsMap.WISHLIST}
          className={cls.profileWishlist__header_icon}
        />
        <h2 className={cls.profileWishlist__header_title}>
          {Placeholders.entities.profile.wishlist.mainText}
        </h2>
      </div>
      {products.length > 0 ? (
        <Suspense fallback={<Loader />}>
          <WishlistProducts />
        </Suspense>
      ) : (
        <div className={cls.profileWishlist__emptyWishlist}>
          <Icon
            Svg={IconsMap.WISHLIST}
            className={cls.profileWishlist__emptyWishlist_icon}
          />
          <h3 className={cls.profileWishlist__emptyWishlist_title}>
            {Placeholders.entities.profile.wishlist.empty.mainText}
          </h3>
          <p className={cls.profileWishlist__emptyWishlist_description}>
            {Placeholders.entities.profile.wishlist.empty.describeText}
          </p>
          <AppLink to={getRouteCatalog()}>
            <Button theme={ButtonTheme.SECONDARY}>
              {Placeholders.entities.profile.wishlist.empty.onRouteCatalog}
            </Button>
          </AppLink>
        </div>
      )}
    </div>
  )
}
