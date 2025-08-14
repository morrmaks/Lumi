import { PageLayout } from '@/widgets/PageLayout'
import { useAppSelector } from '@/shared/lib/hooks'
import { getBasketProducts, BasketProducts } from '@/features/Basket'
import cls from './BasketPage.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalog } from '@/shared/consts/router'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Loader } from '@/shared/ui/Loader'
import { Suspense } from 'react'
import { Placeholders } from '@/shared/consts'

const BasketPage = () => {
  const products = useAppSelector(getBasketProducts)

  return (
    <PageLayout>
      <div className={cls.basketPage}>
        <div className={cls.basketPage__header}>
          <div>
            <h2 className={cls.basketPage__title}>
              {Placeholders.pages.basket.mainText}
            </h2>
            <p className={cls.basketPage__description}>
              {`${Placeholders.pages.basket.productsQuantity}: ${products.length ?? ''}`}
            </p>
          </div>
        </div>
        {products.length > 0 ? (
          <Suspense fallback={<Loader />}>
            <BasketProducts />
          </Suspense>
        ) : (
          <div className={cls.basketPage__emptyBasket}>
            <Icon
              Svg={IconsMap.BASKET}
              className={cls.basketPage__emptyBasket_icon}
            />
            <h3 className={cls.basketPage__emptyBasket_title}>
              {Placeholders.pages.basket.empty.mainText}
            </h3>
            <p className={cls.basketPage__emptyBasket_description}>
              {Placeholders.pages.basket.empty.describeText}
            </p>
            <AppLink to={getRouteCatalog()}>
              <Button theme={ButtonTheme.SECONDARY}>
                {Placeholders.pages.basket.empty.onRouteCatalog}
              </Button>
            </AppLink>
          </div>
        )}
      </div>
    </PageLayout>
  )
}

export default BasketPage
