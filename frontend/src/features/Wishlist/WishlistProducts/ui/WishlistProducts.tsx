import cls from './WishlistProducts.module.less'
import { Checkbox } from '@/shared/ui/Checkbox'
import { WishlistCard, WishlistCardSkeleton } from '@/entities/Wishlist'
import { useEffect, useMemo, useState } from 'react'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useAppSelector } from '@/shared/lib/hooks'
import { getWishlistProductsState } from '@/features/Wishlist'
import { fullSelectDiscountPrice } from '@/features/Wishlist'

export interface IWishlistItem {
  id: string
  image: string
  title: string
  rating: string
  reviews: number
  discountPrice: number
  price: number
}

const WishlistItems: IWishlistItem[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    title: 'NVIDIA GeForce RTX 4080',
    rating: '4.8',
    reviews: 128,
    price: 99990,
    discountPrice: 89990,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'AMD Ryzen 9 7900X',
    rating: '4.7',
    reviews: 245,
    price: 54990,
    discountPrice: 48990,
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Samsung 980 PRO 1TB SSD',
    rating: '4.9',
    reviews: 510,
    price: 12490,
    discountPrice: 12490,
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1736457833735-a24989a1270f?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Corsair Vengeance 32GB DDR5',
    rating: '4.8',
    reviews: 322,
    price: 18990,
    discountPrice: 15990,
  },
  {
    id: '5',
    image:
      'https://avatars.mds.yandex.net/i?id=befd2ba9680b6a66666cfa707d26091a2ed81cea-4600590-images-thumbs&n=13',
    title: 'MSI MAG B650 Tomahawk',
    rating: '4.6',
    reviews: 187,
    price: 24990,
    discountPrice: 24990,
  },
]

export const WishlistProducts = () => {
  const [products, setProducts] = useState<IWishlistItem[]>([])
  const [select, setSelect] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { products: productIds } = useAppSelector(getWishlistProductsState)
  const selectTotalPrice = useMemo(
    () => fullSelectDiscountPrice(products, select),
    [products, select]
  )

  useEffect(() => {
    // const res = await fetch('url', { body: productIds })
    // const data = await res.json()
    // setProducts(data)

    const timeout = setTimeout(() => {
      //имитация загрузки пока нет реальных запросов
      setProducts(WishlistItems)
      setIsLoading(false)
    }, 1500)
  }, [])

  function handleAllSelectCards(newStateChecked: boolean) {
    if (newStateChecked) {
      setSelect(products.map((product) => product.id))
    } else {
      setSelect([])
    }
  }

  function handleSelectCard(id: string, newStateChecked: boolean) {
    if (newStateChecked) {
      setSelect((prev) => [...prev, id])
    } else {
      setSelect(select.filter((cardId) => cardId !== id))
    }
  }

  function handleRemoveCard(id: string) {
    setProducts(products.filter((card) => card.id !== id))
  }

  function handleRemoveSelectCard() {
    // dispatch(removeWishlistProducts(select))
    //используется thunk запрос в котором диспатчится состояние избранного и изменяется значение в localStorage
    setProducts(products.filter((product) => !select.includes(product.id)))
    setSelect([])
  }

  function handleAddToBasketSelectCard() {
    // dispatch(addManyBasketProducts(select))
    //используется thunk запрос в котором диспатчится состояние корзины и изменяется значение в localStorage
    setSelect([])
  }

  return (
    <div className={cls.wishlistProducts}>
      <div className={cls.wishlistProducts__selectAll}>
        <Checkbox onChange={handleAllSelectCards} />
        <p>Выбрать все</p>
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
                  onSelectCard={handleSelectCard}
                  onClickRemove={handleRemoveCard}
                  checked={select.includes(card.id)}
                />
              </li>
            ))}
      </ul>
      {select.length > 0 && (
        <div className={cls.wishlistProducts__selectionActions}>
          <div className={cls.wishlistProducts__selectionActions_infoSection}>
            <span className={cls.wishlistProducts__selectionActions_totalItems}>
              Выбрано товаров: {select.length}
            </span>
            <span className={cls.wishlistProducts__selectionActions_totalPrice}>
              Общая стоимость: {selectTotalPrice} ₽
            </span>
          </div>
          <div className={cls.wishlistProducts__selectionActions_battons}>
            <Button
              theme={ButtonTheme.OUTLINE}
              className={cls.wishlistProducts__selectionActions_batton}
              onClick={handleRemoveSelectCard}
            >
              Удалить выбранные
            </Button>
            <Button
              theme={ButtonTheme.SECONDARY}
              className={cls.wishlistProducts__selectionActions_batton}
              onClick={handleAddToBasketSelectCard}
            >
              Добавить в корзину ({select.length})
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
