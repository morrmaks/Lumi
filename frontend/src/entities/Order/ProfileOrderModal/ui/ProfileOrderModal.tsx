import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Modal } from '@/shared/ui/Modal'
import { IOrder } from '@/features/Order'
import cls from './ProfileOrderModal.module.less'
import { copyToClipboard } from '@/shared/lib/utils'
import { useEffect, useState } from 'react'
import { ProductOrderCard, ProductOrderCardSkeleton } from '@/entities/Order'

export interface Product {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}
const ProductItems: Product[] = [
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Samsung 980 PRO 1TB SSD',
    quantity: 4,
    price: 12490,
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1736457833735-a24989a1270f?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Corsair Vengeance 32GB DDR5',
    quantity: 1,
    price: 18990,
  },
  {
    id: '5',
    image:
      'https://avatars.mds.yandex.net/i?id=befd2ba9680b6a66666cfa707d26091a2ed81cea-4600590-images-thumbs&n=13',
    title: 'MSI MAG B650 Tomahawk',
    quantity: 6,
    price: 24990,
  },
]

interface OrderModalProps {
  onClose: () => void
  card: IOrder
}

export const ProfileOrderModal = ({ onClose, card }: OrderModalProps) => {
  const [productList, setProductList] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    id,
    total,
    status,
    date,
    products,
    trackNumber,
    address,
    paymentMethod,
  } = card

  useEffect(() => {
    // const products = await dispatch(getProducts(products))
    // setProductList(products)
    // setProductList(products)

    const timeout = setTimeout(() => {
      //имитация загрузки пока нет реальных запросов
      setProductList(ProductItems)
      setIsLoading(false)
    }, 1500)
  }, [])

  return (
    <Modal onClose={onClose}>
      <div className={cls.profileOrderModal}>
        <div className={cls.profileOrderModal__header}>
          <Icon
            Svg={IconsMap.ORDERS}
            className={cls.profileOrderModal__header_icon}
          />
          <h3
            className={cls.profileOrderModal__header_title}
          >{`Заказ ${id}`}</h3>
        </div>
        <div className={cls.profileOrderModal__sectionStatus}>
          <div className={cls.profileOrderModal__statusContainter}>
            <span className={cls.profileOrderModal__sectionStatus_status}>
              {status}
            </span>
            <span className={cls.profileOrderModal__sectionStatus_date}>
              Заказ от {date}
            </span>
          </div>
          <div className={cls.profileOrderModal__trackNumberContainer}>
            <span className={cls.profileOrderModal__trackNumberContainer_title}>
              Номер отслеживания
            </span>
            <div className={cls.profileOrderModal__trackNumber}>
              {trackNumber}
              <Icon
                Svg={IconsMap.COPY}
                className={cls.profileOrderModal__trackNumber_copyIcon}
                onClick={() => copyToClipboard(trackNumber)}
              />
            </div>
          </div>
        </div>
        <div className={cls.profileOrderModal__sectionProducts}>
          <h4 className={cls.profileOrderModal__sectionProducts_title}>
            Товары
          </h4>
          <ul className={cls.profileOrderModal__productList}>
            {isLoading
              ? [...new Array(3)].map((_, index) => (
                  <li className={cls.profileOrderModal__product} key={index}>
                    <ProductOrderCardSkeleton />
                  </li>
                ))
              : productList.map((card) => (
                  <li className={cls.profileOrderModal__product} key={card.id}>
                    <ProductOrderCard card={card} />
                  </li>
                ))}
          </ul>
        </div>
        <div className={cls.profileOrderModal__sectionDetails}>
          <h4 className={cls.profileOrderModal__sectionDetails_title}>
            Детали заказа
          </h4>
          <div className={cls.profileOrderModal__sectionDetails_container}>
            <div
              className={cls.profileOrderModal__sectionDetails_addressContainer}
            >
              <span
                className={cls.profileOrderModal__sectionDetails_addressTitle}
              >
                Адрес доставки
              </span>
              <p className={cls.profileOrderModal__sectionDetails_address}>
                {address}
              </p>
            </div>
            <div
              className={cls.profileOrderModal__sectionDetails_paymentContainer}
            >
              <span
                className={cls.profileOrderModal__sectionDetails_paymentTitle}
              >
                Метод оплаты
              </span>
              <span
                className={cls.profileOrderModal__sectionDetails_paymentMethod}
              >
                {paymentMethod}
              </span>
            </div>
          </div>
        </div>
        <div className={cls.profileOrderModal__sectionTotalPrice}>
          <span className={cls.profileOrderModal__sectionTotalPrice_title}>
            Итого к оплате
          </span>
          <span className={cls.profileOrderModal__orderPrice}>{total} ₽</span>
        </div>
      </div>
    </Modal>
  )
}
