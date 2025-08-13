import cls from './ProductPage.module.less'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { memo, useEffect } from 'react'
import { PageLayout } from '@/widgets/PageLayout'
import { ProductDetails, ProductImages } from '@/entities/ProductDetails'
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components'
import { IProduct } from '@/features/Product'
import {
  getProductCard,
  productPageActions,
  productPageReducer,
} from '@/pages/ProductPage'

const productCard: IProduct = {
  id: '1',
  images: [
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ],
  title: 'NVIDIA GeForce RTX 4080',
  description:
    'Мощный процессор Intel Core i7-13700K 13-го поколения с 16 ядрами и 24 потоками. Отличается высокой производительностью в играх и профессиональных приложениях благодаря гибридной архитектуре с P-ядрами и E-ядрами.',
  specs: [
    {
      label: 'Количество потоков',
      value: 2,
    },
    {
      label: 'Сокет',
      value: 'AM5',
    },
  ],
  rating: '4.8',
  reviews: 128,
  price: 99990,
  discountPrice: 89990,
  componentName: 'graphics-card',
}

const initialReducers: ReducerList = {
  productPage: productPageReducer,
}

const ProductPage = () => {
  const product = useAppSelector(getProductCard)
  const dispatch = useAppDispatch()
  const productId = useParams().productId

  useEffect(() => {
    // const res = await dispatch(getProduct(productId))
    // setProduct(res)
    dispatch(productPageActions.setIsLoading(true))
    setTimeout(() => {
      dispatch(productPageActions.setProduct(productCard))
      dispatch(productPageActions.setIsLoading(false))
    }, 1000)
  }, [productId, dispatch])

  if (!productId) {
    return <div>Товар не найден</div>
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
      <PageLayout name={product.title}>
        <div className={cls.productPage}>
          <ProductImages />
          <ProductDetails />
        </div>
      </PageLayout>
    </DynamicModuleLoader>
  )
}

export default memo(ProductPage)
