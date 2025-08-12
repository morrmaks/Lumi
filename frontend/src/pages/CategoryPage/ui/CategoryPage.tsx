import cls from './CategoryPage.module.less'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { CategoryFilters, CategoryProducts } from '@/features/Category'
import { PageLayout } from '@/widgets/PageLayout'
import {
  DynamicModuleLoader,
  InfiniteScrollWrapper,
  ReducerList,
} from '@/shared/lib/components'
import {
  categoryPageReducer,
  getCategoryName,
  getCategoryProducts,
  ICategoryProduct,
} from '@/pages/CategoryPage'
import { categoryPageActions } from '@/pages/CategoryPage/model/slice/categoryPageSlice'
import { ConfiguratorComponents } from '@/features/Configurator'

const productList: ICategoryProduct[] = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    title: 'NVIDIA GeForce RTX 4080',
    rating: '4.8',
    reviews: '128',
    price: 99990,
    discountPrice: 89990,
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'AMD Ryzen 9 7900X',
    rating: '4.7',
    reviews: '245',
    price: 54990,
    discountPrice: 48990,
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Samsung 980 PRO 1TB SSD',
    rating: '4.9',
    reviews: '510',
    price: 12490,
    discountPrice: 12490,
  },
  {
    id: '4',
    image:
      'https://images.unsplash.com/photo-1736457833735-a24989a1270f?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Corsair Vengeance 32GB DDR5',
    rating: '4.8',
    reviews: '322',
    price: 18990,
    discountPrice: 15990,
  },
  {
    id: '5',
    image:
      'https://avatars.mds.yandex.net/i?id=befd2ba9680b6a66666cfa707d26091a2ed81cea-4600590-images-thumbs&n=13',
    title: 'MSI MAG B650 Tomahawk',
    rating: '4.6',
    reviews: '187',
    price: 24990,
    discountPrice: 24990,
  },
  {
    id: '6',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    title: 'NVIDIA GeForce RTX 4080',
    rating: '4.8',
    reviews: '128',
    price: 99990,
    discountPrice: 89990,
  },
  {
    id: '7',
    image:
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'AMD Ryzen 9 7900X',
    rating: '4.7',
    reviews: '245',
    price: 54990,
    discountPrice: 48990,
  },
  {
    id: '8',
    image:
      'https://images.unsplash.com/photo-1577538926210-fc6cc624fde2?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Samsung 980 PRO 1TB SSD',
    rating: '4.9',
    reviews: '510',
    price: 12490,
    discountPrice: 12490,
  },
  {
    id: '9',
    image:
      'https://images.unsplash.com/photo-1736457833735-a24989a1270f?q=80&w=874&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Corsair Vengeance 32GB DDR5',
    rating: '4.8',
    reviews: '322',
    price: 18990,
    discountPrice: 15990,
  },
  {
    id: '0',
    image:
      'https://avatars.mds.yandex.net/i?id=befd2ba9680b6a66666cfa707d26091a2ed81cea-4600590-images-thumbs&n=13',
    title: 'MSI MAG B650 Tomahawk',
    rating: '4.6',
    reviews: '187',
    price: 24990,
    discountPrice: 24990,
  },
  {
    id: '11',
    image:
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300&h=300&fit=crop',
    title: 'NVIDIA GeForce RTX 4080',
    rating: '4.8',
    reviews: '128',
    price: 99990,
    discountPrice: 89990,
  },
  {
    id: '12',
    image:
      'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'AMD Ryzen 9 7900X',
    rating: '4.7',
    reviews: '245',
    price: 54990,
    discountPrice: 48990,
  },
]

const initialReducers: ReducerList = {
  categoryPage: categoryPageReducer,
}

const CategoryPage = () => {
  const dispatch = useAppDispatch()
  const categoryName = useAppSelector(getCategoryName)
  const products = useAppSelector(getCategoryProducts)
  const categoryId = useParams().categoryId

  useEffect(() => {
    dispatch(categoryPageActions.resetCategoryPage())
    // const res = await dispatch(getCategory(categoryId))
    dispatch(categoryPageActions.setId(categoryId ?? ''))

    dispatch(categoryPageActions.setIsLoading(true))
    setTimeout(() => {
      dispatch(categoryPageActions.setProducts(productList))
      dispatch(categoryPageActions.setIsLoading(false))
    }, 1000) //имитация загрузки
  }, [dispatch, categoryId])

  const onLoadNextPart = useCallback(() => {
    dispatch(categoryPageActions.setIsLoading(true))
    setTimeout(() => {
      dispatch(categoryPageActions.addProducts(productList))
      dispatch(categoryPageActions.setIsLoading(false))
    }, 1000) //имитация загрузки
    // dispatch(fetchNextCategoryPage())
  }, [dispatch])

  if (!categoryId) {
    return <div>Категория не найдена</div>
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
      <PageLayout name={categoryName}>
        <div className={cls.categoryPage}>
          <div className={cls.categoryPage__header}>
            <div>
              <h2 className={cls.categoryPage__title}>
                Категория {categoryName}
              </h2>
            </div>
          </div>
          <div className={cls.categoryPage__productsSecton}>
            <div className={cls.categoryPage__configuratorCarousel}>
              <ConfiguratorComponents carousel />
            </div>
            <CategoryFilters />
            <InfiniteScrollWrapper
              onScrollEnd={onLoadNextPart}
              withWrapperScroll={false}
            >
              <CategoryProducts products={products} />
            </InfiniteScrollWrapper>
          </div>
        </div>
      </PageLayout>
    </DynamicModuleLoader>
  )
}

export default CategoryPage
