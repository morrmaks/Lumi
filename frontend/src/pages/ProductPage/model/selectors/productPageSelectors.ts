import { StateSchema } from '@/app/providers/StoreProvider'
import { ComponentNames } from '@/features/Configurator'

export const getProductIsLoading = (state: StateSchema) =>
  state.productPage?.isLoading || false

export const getProductCard = (state: StateSchema) =>
  state.productPage?.product ?? {
    id: '',
    images: [],
    title: '',
    description: '',
    componentName: ComponentNames.GPU,
    specs: [],
    rating: '',
    reviews: 0,
    discountPrice: 0,
    price: 0,
  }
