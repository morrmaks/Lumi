import cls from './ProductPage.module.less'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks'
import { memo, useEffect, useState } from 'react'
import { PageLayout } from '@/widgets/PageLayout'
import { IProduct } from '@/pages/ProductPage'
import { ProductDetails, ProductImages } from '@/entities/ProductDetails'

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
  description: 'Лучшая видеокарта во вселенной, просто топ',
  specs: {},
  rating: '4.8',
  reviews: '128',
  price: 99990,
  discountPrice: 89990,
  componentName: 'graphics-card',
}

const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>()
  const dispatch = useAppDispatch()
  const productId = useParams().productId

  useEffect(() => {
    // const res = await dispatch(getProduct(productId))
    // setProduct(res)
    setProduct(productCard)
  }, [productId, dispatch])

  if (!product) {
    return <div>Товар не найден</div>
  }

  return (
    <PageLayout name={product.title}>
      <div className={cls.productPage}>
        <ProductImages product={product} />
        <ProductDetails product={product} />
      </div>
    </PageLayout>
  )
}

export default memo(ProductPage)
