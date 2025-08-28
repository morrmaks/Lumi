import { useCallback, useEffect, useMemo, useState } from 'react'
import cls from './BasketProducts.module.less'
import { BasketCard, BasketCardSkeleton } from '@/entities/Basket'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import {
  fullBasketPrices,
  totalBasketProducts,
  getBasketDiscountAmount,
  getBasketProducts,
  useGetBasketProductsQuery,
  IBasketProduct,
} from '@/features/Basket'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog, getRouteOrder } from '@/shared/consts/router'
import { Placeholders } from '@/shared/consts'
import { orderActions } from '@/features/Order'
import { useNavigate } from 'react-router-dom'

const BasketProducts = () => {
  const [products, setProducts] = useState<IBasketProduct[]>([])
  const basketItems = useAppSelector(getBasketProducts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { data: basketProducts, isLoading } = useGetBasketProductsQuery(
    basketItems.map((item) => item.productId),
    { skip: !basketItems.length }
  )

  useEffect(() => {
    if (basketProducts) {
      setProducts(basketProducts)
    }
  }, [basketProducts])

  const { price, discountPrice } = useMemo(
    () => fullBasketPrices(basketItems, products),
    [basketItems, products]
  )

  const discountAmount = useMemo(
    () => getBasketDiscountAmount(price, discountPrice),
    [price, discountPrice]
  )

  const totalProducts = useMemo(
    () => totalBasketProducts(basketItems),
    [basketItems]
  )

  const handleOrder = useCallback(() => {
    dispatch(orderActions.setProducts(basketItems))
    dispatch(orderActions.setIsFromOrderLink(true))
    navigate(getRouteOrder())
  }, [navigate, basketItems])

  return (
    <div className={cls.basketProducts}>
      <ul className={cls.basketProducts__productList}>
        {isLoading
          ? [...new Array(5)].map((_, index) => (
              <li key={index}>
                <BasketCardSkeleton />
              </li>
            ))
          : products.map((card) => (
              <li key={card.id}>
                <BasketCard card={card} />
              </li>
            ))}
        <AppLink
          to={getRouteCatalog()}
          className={cls.basketProducts__addProduct}
          key="addProduct"
        >
          <p className={cls.basketProducts__addProduct_title}>
            {Placeholders.features.basket.products.onRouteCatalog.describeText}
          </p>
          <div className={cls.basketProducts__addProduct_description}>
            <Icon Svg={IconsMap.PLUS} />
            <p>
              {Placeholders.features.basket.products.onRouteCatalog.triggerText}
            </p>
          </div>
        </AppLink>
      </ul>
      <div className={cls.basketProducts__order}>
        <h3 className={cls.basketProducts__order_title}>
          {Placeholders.features.basket.products.order.mainText}
        </h3>
        <div className={cls.basketProducts__order_subtotal}>
          <div className={cls.basketProducts__order_price}>
            <span>{`Товары, ${totalProducts} шт.`}</span>
            <span>{price} ₽</span>
          </div>
          <div className={cls.basketProducts__order_discount}>
            <span>{Placeholders.features.basket.products.order.discount}</span>
            <span>{discountAmount > 0 ? `-${discountAmount}` : `0`} ₽</span>
          </div>
          <div className={cls.basketProducts__order_delivery}>
            <span>{Placeholders.features.basket.products.order.delivery}</span>
            <span>бесплатно</span>
          </div>
          <div className={cls.basketProducts__order_discountPrice}>
            <span>{Placeholders.features.basket.products.order.price}</span>
            <span>{discountPrice} ₽</span>
          </div>
        </div>
        <Button
          theme={ButtonTheme.PRIMARY}
          className={cls.basketProducts__orderButton}
          onClick={handleOrder}
          disabled={basketItems.length === 0}
        >
          <Icon Svg={IconsMap.PAYMENT} />
          {Placeholders.features.basket.products.onPlaceAnOrder}
        </Button>
      </div>
    </div>
  )
}

export default BasketProducts
