import cls from './ProductPage.module.less'
import { useLocation, useParams } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useEffect, useState } from 'react'

const ProductPage = () => {
  const [product, setProduct] = useState({})
  const pathname = useLocation().pathname
  const dispatch = useAppDispatch()
  const productId = useParams().productId

  useEffect(() => {
    // const res = await dispatch(getProduct(productId))
    // setProduct(res)
    // dispatch(breadcrumbNavActions.setName({ path: pathname, name: res.name }))
  })

  return (
    <div className={cls.productPage}>
      <p>Продукт {productId}</p>
    </div>
  )
}

export default ProductPage
