import cls from './ProfileWishlist.module.less'
import {
  getWishlistProductsState,
  WishlistProducts,
} from '@/features/WishlistProducts'
import { useAppSelector } from '@/shared/lib/hooks'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import { Button, ButtonTheme } from '@/shared/ui/Button'

export const ProfileWishlist = () => {
  const { products } = useAppSelector(getWishlistProductsState)

  return (
    <div className={cls.profileWishlist}>
      <div className={cls.profileWishlist__header}>
        <Icon
          Svg={IconsMap.WISHLIST}
          className={cls.profileWishlist__header_icon}
        />
        <h2 className={cls.profileWishlist__header_title}>Избранные товары</h2>
      </div>
      {products.length > 0 ? (
        <WishlistProducts />
      ) : (
        <div className={cls.profileWishlist__emptyWishlist}>
          <Icon
            Svg={IconsMap.WISHLIST}
            className={cls.profileWishlist__emptyWishlist_icon}
          />
          <h3 className={cls.profileWishlist__emptyWishlist_title}>
            Список избранного пуст
          </h3>
          <p className={cls.profileWishlist__emptyWishlist_description}>
            Добавьте товары в избранное, чтобы не потерять
          </p>
          <AppLink to={getRouteCatalog()}>
            <Button theme={ButtonTheme.SECONDARY}>Перейти в каталог</Button>
          </AppLink>
        </div>
      )}
    </div>
  )
}
