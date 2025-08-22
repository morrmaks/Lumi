import cls from './WishlistProducts.module.less'
import { Checkbox } from '@/shared/ui/Checkbox'
import { WishlistCard, WishlistCardSkeleton } from '@/entities/Wishlist'
import { useEffect, useMemo, useState } from 'react'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useAppSelector } from '@/shared/lib/hooks'
import { getWishlistProducts, IWishlistProduct } from '@/features/Wishlist'
import { fullSelectDiscountPrice } from '@/features/Wishlist'
import { Placeholders } from '@/shared/consts'
import { useGetWishlistProductsQuery } from '@/features/Wishlist/api/wishlistApi'
import { getBasketProducts } from '@/features/Basket'
import { useWishlistProductsActions } from '@/features/Wishlist'

const WishlistProducts = () => {
  const [select, setSelect] = useState<string[]>([])
  const [products, setProducts] = useState<IWishlistProduct[]>([])
  const productIds = useAppSelector(getWishlistProducts)
  const basketItems = useAppSelector(getBasketProducts)

  const { data: wishlistProducts, isLoading } = useGetWishlistProductsQuery(
    productIds,
    { skip: !productIds.length }
  )
  const {
    selectAllCards,
    selectCard,
    removeCard,
    removeSelectCard,
    addSelectedToBasket,
    isLoadingDeleteWishlistProduct,
    isLoadingDeleteWishlistProducts,
    isLoadingAddToBasketProducts,
  } = useWishlistProductsActions(basketItems, products, select, setSelect)

  useEffect(() => {
    if (wishlistProducts) {
      setProducts(wishlistProducts)
    }
  }, [wishlistProducts])

  const selectTotalPrice = useMemo(() => {
    if (!products || !select.length) return 0
    return fullSelectDiscountPrice(products, select)
  }, [products, select])

  if (!products) return <div>Товары не найдены</div>

  return (
    <div className={cls.wishlistProducts}>
      <div className={cls.wishlistProducts__selectAll}>
        <Checkbox onChange={selectAllCards} />
        <p>{Placeholders.features.wishlist.products.onSelectAll}</p>
      </div>
      <ul className={cls.wishlistProducts__productList}>
        {isLoading
          ? [...new Array(5)].map((_, index) => (
              <li key={index}>
                <WishlistCardSkeleton />
              </li>
            ))
          : products.map((card) => (
              <li key={card.id}>
                <WishlistCard
                  card={card}
                  onSelectCard={selectCard}
                  onClickRemove={removeCard}
                  checked={select.includes(card.id)}
                  isLoadingDeleteWishlistProduct={
                    isLoadingDeleteWishlistProduct
                  }
                />
              </li>
            ))}
      </ul>
      {select.length > 0 && (
        <div className={cls.wishlistProducts__selectionActions}>
          <div className={cls.wishlistProducts__selectionActions_infoSection}>
            <span className={cls.wishlistProducts__selectionActions_totalItems}>
              {`${Placeholders.features.wishlist.products.select.quantity} ${select.length}`}
            </span>
            <span className={cls.wishlistProducts__selectionActions_totalPrice}>
              {`${Placeholders.features.wishlist.products.select.price} ${selectTotalPrice} ₽`}
            </span>
          </div>
          <div className={cls.wishlistProducts__selectionActions_battons}>
            <Button
              theme={ButtonTheme.OUTLINE}
              className={cls.wishlistProducts__selectionActions_batton}
              onClick={removeSelectCard}
              disabled={isLoadingDeleteWishlistProducts}
            >
              {Placeholders.features.wishlist.products.select.onDelete}
            </Button>
            <Button
              theme={ButtonTheme.SECONDARY}
              className={cls.wishlistProducts__selectionActions_batton}
              onClick={addSelectedToBasket}
              disabled={isLoadingAddToBasketProducts}
            >
              {`${Placeholders.features.wishlist.products.select.onAddToBasket} (${select.length})`}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WishlistProducts
