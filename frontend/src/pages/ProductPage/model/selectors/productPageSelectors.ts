import { StateSchema } from '@/app/providers/StoreProvider'
import { ComponentTypes } from '@/features/Configurator'

export const getProductCard = (state: StateSchema) =>
  state.productPage?.product ?? {
    id: '',
    images: [],
    name: '',
    description: '',
    componentType: ComponentTypes.GPU,
    specs: {},
    rating: '',
    reviews: 0,
    categoryId: '',
    discountPrice: 0,
    price: 0,
    quantity: 0,
  }
