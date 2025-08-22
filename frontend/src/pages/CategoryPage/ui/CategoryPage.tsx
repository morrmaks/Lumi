import cls from './CategoryPage.module.less'
import { useParams, useSearchParams } from 'react-router-dom'
import { Suspense, useCallback } from 'react'
import {
  useAppDispatch,
  useAppSelector,
  useDebounceValue,
} from '@/shared/lib/hooks'
import {
  CategoryFilters,
  CategoryProducts,
  useGetCategoryQuery,
  useGetCategoryProductsQuery,
} from '@/features/Category'
import { PageLayout } from '@/widgets/PageLayout'
import {
  DynamicModuleLoader,
  InfiniteScrollWrapper,
  ReducerList,
} from '@/shared/lib/components'
import {
  categoryPageReducer,
  getCategoryState,
  useInitCategoryPage,
  useSyncProducts,
  useSyncQueryParams,
} from '@/pages/CategoryPage'
import { categoryPageActions } from '@/pages/CategoryPage/model/slice/categoryPageSlice'
import {
  ConfiguratorComponents,
  ConfiguratorComponentsSkeleton,
} from '@/features/Configurator'
import { Placeholders } from '@/shared/consts'
import { CategoryPageSkeleton } from './CategoryPageSkeleton'

const initialReducers: ReducerList = {
  categoryPage: categoryPageReducer,
}

const CategoryPage = () => {
  const dispatch = useAppDispatch()
  const { category, page, view, products, hasMore, sort, search, limit } =
    useAppSelector(getCategoryState)
  const [searchParams] = useSearchParams()
  const categoryId = useParams().categoryId ?? ''
  const debouncedSearch = useDebounceValue(search, 300)

  const { data, isLoading, isFetching } = useGetCategoryQuery(categoryId, {
    skip: !categoryId,
  })

  const {
    data: productsData,
    isLoading: productsIsLoading,
    isFetching: productsIsFetching,
    error: productsError,
  } = useGetCategoryProductsQuery(
    { id: category.id, search: debouncedSearch, sort, page, limit, view },
    { skip: !category.id }
  )

  useSyncQueryParams({ page, view, sort, search, limit })
  useSyncProducts(productsData, productsError, page, dispatch)
  useInitCategoryPage(dispatch, data, categoryId, searchParams)

  const onLoadNextPart = useCallback(() => {
    if (hasMore) {
      dispatch(categoryPageActions.setPage(page + 1))
    }
  }, [hasMore, page, dispatch])

  if (!categoryId) {
    return <div>{Placeholders.pages.category.notFound}</div>
  }

  if (isLoading || isFetching) {
    return <CategoryPageSkeleton />
  }

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount={false}>
      <PageLayout>
        <div className={cls.categoryPage}>
          <div className={cls.categoryPage__header}>
            <div>
              <h2 className={cls.categoryPage__title}>{category.name}</h2>
              <p className={cls.categoryPage__description}>
                {category.description}
              </p>
              <p className={cls.categoryPage__productQuantity}>
                {`${Placeholders.pages.category.productsQuantity}${category.productCount}`}
              </p>
            </div>
          </div>
          <div className={cls.categoryPage__productsSecton}>
            <div className={cls.categoryPage__configuratorCarousel}>
              <Suspense fallback={<ConfiguratorComponentsSkeleton carousel />}>
                <ConfiguratorComponents carousel />
              </Suspense>
            </div>
            <CategoryFilters />
            <InfiniteScrollWrapper
              onScrollEnd={onLoadNextPart}
              withWrapperScroll={false}
              enabled={
                hasMore &&
                products.length > 0 &&
                !productsIsLoading &&
                !productsIsFetching
              }
            >
              <CategoryProducts
                isFetching={productsIsFetching}
                isLoading={productsIsLoading}
                categoryIsLoading={isLoading}
              />
            </InfiniteScrollWrapper>
          </div>
        </div>
      </PageLayout>
    </DynamicModuleLoader>
  )
}

export default CategoryPage
