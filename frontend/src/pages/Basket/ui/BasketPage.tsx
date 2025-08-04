import { PageLayout } from '@/widgets/PageLayout'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useEffect } from 'react'
import {
  getBasketProductsState,
  BasketProducts,
  basketProductsActions,
} from '@/features/BasketProducts'
import cls from './BasketPage.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import { Button, ButtonTheme } from '@/shared/ui/Button'

const BasketPage = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(basketProductsActions.addProduct({ id: '1', quantity: 1 })) //это будет происходить при инициализации приложения
  }, [dispatch])

  const { products } = useAppSelector(getBasketProductsState)

  return (
    <PageLayout>
      <div className={cls.basketPage}>
        <div className={cls.basketPage__header}>
          <div>
            <h2 className={cls.basketPage__title}>Корзина</h2>
            <p className={cls.basketPage__description}>
              {`Товаров в корзине: ${products.length ?? ''}`}
            </p>
          </div>
        </div>
        {products.length > 0 ? (
          <BasketProducts />
        ) : (
          <div className={cls.basketPage__emptyBasket}>
            <Icon
              Svg={IconsMap.BASKET}
              className={cls.basketPage__emptyBasket_icon}
            />
            <h3 className={cls.basketPage__emptyBasket_title}>Корзина пуста</h3>
            <p className={cls.basketPage__emptyBasket_description}>
              Добавьте товары в корзину, чтобы оформить заказ
            </p>
            <AppLink to={getRouteCatalog()}>
              <Button theme={ButtonTheme.SECONDARY}>Перейти в каталог</Button>
            </AppLink>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default BasketPage
