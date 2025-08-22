import cls from './ProductPage.module.less'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { memo, useEffect } from 'react'
import { PageLayout } from '@/widgets/PageLayout'
import { ProductDetails, ProductImages } from '@/entities/ProductDetails'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components'
import { useGetProductQuery } from '@/features/Product'
import {
  getProductCard,
  productPageActions,
  productPageReducer,
} from '@/pages/ProductPage'
import { BackButton } from '@/shared/ui/BackButton'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap, Placeholders } from '@/shared/consts'
import { breadcrumbNavActions } from '@/features/BreadcrumbNav'

const initialReducers: ReducerList = {
  productPage: productPageReducer,
}

const ProductPage = () => {
  const product = useAppSelector(getProductCard)
  const dispatch = useAppDispatch()
  const productId = useParams().productId

  const { data, isLoading, isFetching } = useGetProductQuery(productId ?? '')

  useEffect(() => {
    if (data) {
      dispatch(breadcrumbNavActions.setBreadcrumbs(data?.breadcrumb))
      dispatch(productPageActions.setProduct(data.product))
    }

    return () => {
      dispatch(productPageActions.resetProductPage())
    }
  }, [data, dispatch])

  if (!productId) {
    return <div>{Placeholders.pages.product.notFound}</div>
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
      <PageLayout name={product.name}>
        <div className={cls.productPage}>
          <BackButton className={cls.productPage__backButton}>
            <Icon Svg={IconsMap.CHEVRON_LEFT} />
            {Placeholders.pages.product.onRouteBack}
          </BackButton>
          <div className={cls.productPage__content}>
            <ProductImages isLoading={isLoading || isFetching} />
            <ProductDetails isLoading={isLoading || isFetching} />
          </div>
        </div>
      </PageLayout>
    </DynamicModuleLoader>
  )
}

export default memo(ProductPage)
