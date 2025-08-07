import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import cls from './ProductOrderCard.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { useCallback } from 'react'
import { Product } from '@/entities/Order/ProfileOrderModal/ui/ProfileOrderModal'

interface ProductCardProps {
  card: Product
}

export const ProductOrderCard = ({ card }: ProductCardProps) => {
  const { id, title, price, image, quantity } = card

  const getPriceCard = useCallback(
    (quantity: number, price: number) => {
      return quantity * price
    },
    [quantity, price]
  )

  return (
    <div className={cls.productOrderCard}>
      <AppLink to={getRouteCatalog()}>
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
      </AppLink>
      <div className={cls.productOrderCard__priceContainer}>
        <span className={cls.productOrderCard__totalPrice}>
          {getPriceCard(quantity, price)} ₽
        </span>
        <span className={cls.productOrderCard__price}>{price} ₽ за шт.</span>
      </div>
    </div>
  )
}
