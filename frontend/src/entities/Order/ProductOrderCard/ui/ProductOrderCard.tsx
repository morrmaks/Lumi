import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import cls from './ProductOrderCard.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { useMemo } from 'react'
import { Product } from '@/entities/Order/ProfileOrderModal/ui/ProfileOrderModal'
import { getPriceOrderCard } from '@/entities/Order'

interface ProductCardProps {
  card: Product
}

export const ProductOrderCard = ({ card }: ProductCardProps) => {
  const { id, title, price, image, quantity } = card

  const orderCardPrice = useMemo(
    () => getPriceOrderCard(quantity, price),
    [quantity, price]
  )

  return (
    <AppLink to={getRouteCatalog()} className={cls.productOrderCard}>
      <div className={cls.productOrderCard__meta}>
        <AppImage
          className={cls.productOrderCard__image}
          src={image}
          alt={title}
        />
        <div>
          <h5 className={cls.productOrderCard__title}>{title}</h5>
          <span>{`Количество ${quantity}`}</span>
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
