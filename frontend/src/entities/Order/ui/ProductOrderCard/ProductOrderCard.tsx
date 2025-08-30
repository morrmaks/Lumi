import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogItem } from '@/shared/consts/router'
import cls from './ProductOrderCard.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { useMemo } from 'react'
import { getPriceOrderCard } from '@/entities/Order'
import { Placeholders } from '@/shared/consts'
import { IOrderProductFull } from '@/features/Order'

export interface ProductCardProps {
  card: IOrderProductFull
}

export const ProductOrderCard = ({ card }: ProductCardProps) => {
  const { id, name, price, image, quantity, categorySlug } = card

  const orderCardPrice = useMemo(
    () => getPriceOrderCard(quantity, price),
    [quantity, price]
  )

  return (
    <AppLink
      to={getRouteCatalogItem(categorySlug, id)}
      className={cls.productOrderCard}
    >
      <div className={cls.productOrderCard__meta}>
        <AppImage
          className={cls.productOrderCard__image}
          src={image}
          alt={name}
        />
        <div>
          <h5 className={cls.productOrderCard__title}>{name}</h5>
          <span className={cls.productOrderCard__quantity}>
            {`${Placeholders.entities.order.profileOrderCard.productsQuantity} ${quantity}`}
          </span>
        </div>
      </div>
      <div className={cls.productOrderCard__priceContainer}>
        <span className={cls.productOrderCard__totalPrice}>
          {orderCardPrice} ₽
        </span>
        <span className={cls.productOrderCard__price}>{price} ₽ за шт.</span>
      </div>
    </AppLink>
  )
}
