import { useEffect, useState } from 'react'
import cls from './BasketProducts.module.less'
import { BasketCard, BasketCardSkeleton } from '@/entities/Basket'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useAppSelector } from '@/shared/lib/hooks'
import { getBasketProductsState } from '@/features/BasketProducts'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'

interface IBasketItem {
  id: string
  image: string
  title: string
  rating: string
  reviews: string
  quantity: number
  discountPrice: number
  price: number
}

const BasketItems: IBasketItem[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    title: 'NVIDIA GeForce RTX 4080',
    rating: '4.8',
    reviews: '128',
    quantity: 1,
    discountPrice: 89990,
    price: 99990,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'AMD Ryzen 9 7900X',
    rating: '4.7',
    reviews: '245',
    quantity: 2,
    discountPrice: 48990,
    price: 54990,
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Samsung 980 PRO 1TB SSD',
    rating: '4.9',
    reviews: '510',
    quantity: 4,
    discountPrice: 12490,
    price: 12490,
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1736457833735-a24989a1270f?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Corsair Vengeance 32GB DDR5',
    rating: '4.8',
    reviews: '322',
    quantity: 1,
    discountPrice: 15990,
    price: 18990,
  },
  {
    id: '5',
    image:
      'https://avatars.mds.yandex.net/i?id=befd2ba9680b6a66666cfa707d26091a2ed81cea-4600590-images-thumbs&n=13',
    title: 'MSI MAG B650 Tomahawk',
    rating: '4.6',
    reviews: '187',
    quantity: 6,
    discountPrice: 24990,
    price: 24990,
  },
]

export const BasketProducts = () => {
  const [products, setProducts] = useState<IBasketItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { products: productIds } = useAppSelector(getBasketProductsState)

  useEffect(() => {
    // const res = await fetch('url', { body: productIds })
    // const data = await res.json()
    // setProducts(data)

    const timeout = setTimeout(() => {
      //имитация загрузки пока нет реальных запросов
      setProducts(BasketItems)
      setIsLoading(false)
    }, 1500)
  }, [])

  function fullPrice() {
    const discountPrice = products.reduce((acc, product) => {
      return acc + product.discountPrice * product.quantity
    }, 0)

    const price = products.reduce((acc, product) => {
      return acc + product.price * product.quantity
    }, 0)

    return { discountPrice, price }
  }

  function getDiscountAmount() {
    return fullPrice().price - fullPrice().discountPrice
  }

  function totalProducts() {
    return products.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)
  }

  function handleRemoveCard(id: string) {
    setProducts(products.filter((card) => card.id !== id))
  }

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
                <BasketCard card={card} onClickRemove={handleRemoveCard} />
              </li>
            ))}
        <li className={cls.basketProducts__addProduct} key="addProduct">
          <p className={cls.basketProducts__addProduct_title}>
            Нужно что то еще?
          </p>
          <AppLink to={getRouteCatalog()}>
            <Button
              theme={ButtonTheme.OUTLINE}
              className={cls.basketProducts__addProduct_button}
            >
              <Icon Svg={IconsMap.PLUS} />
              <p>Продолжить покупки</p>
            </Button>
          </AppLink>
        </li>
      </ul>
      <div className={cls.basketProducts__order}>
        <h3 className={cls.basketProducts__order_title}>Ваш заказ</h3>
        <div className={cls.basketProducts__order_subtotal}>
          <div className={cls.basketProducts__order_price}>
            <span>{`Товары, ${totalProducts()} шт.`}</span>
            <span>{fullPrice().price} ₽</span>
          </div>
          <div className={cls.basketProducts__order_discount}>
            <span>Ваша скидка</span>
            <span>
              {getDiscountAmount() > 0 ? `-${getDiscountAmount()}` : `0`} ₽
            </span>
          </div>
          <div className={cls.basketProducts__order_delivery}>
            <span>Доставка</span>
            <span>бесплатно</span>
          </div>
          <div className={cls.basketProducts__order_discountPrice}>
            <span>Итого</span>
            <span>{fullPrice().discountPrice} ₽</span>
          </div>
        </div>
        <Button
          theme={ButtonTheme.PRIMARY}
          className={cls.basketProducts__orderButton}
        >
          <Icon Svg={IconsMap.PAYMENT} />
          Оформить заказ
        </Button>
      </div>
    </div>
  )
}
