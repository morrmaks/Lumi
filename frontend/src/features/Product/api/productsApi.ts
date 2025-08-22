import { IProductWithBreadcrumb } from '@/pages/ProductPage'
import { rtkApi } from '@/shared/api'
import { IProduct } from '../model'
import { ApiMap } from '@/shared/consts'

interface IProductsData {
  products: IProduct[]
}

export const productApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<IProductsData, void>({
      query() {
        return {
          url: `${ApiMap.GET_PRODUCTS}`,
          method: 'GET',
        }
      },
      transformResponse: (response: IProductsData) => response,
    }),
    getProduct: build.query<IProductWithBreadcrumb, string>({
      query(id) {
        return {
          url: `${ApiMap.GET_PRODUCTS}/${id}`,
          method: 'GET',
        }
      },
      transformResponse: (response: IProductWithBreadcrumb) => response,
    }),
  }),
})

export const { useGetProductsQuery, useGetProductQuery } = productApi
