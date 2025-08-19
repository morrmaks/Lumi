import { ComponentTypes, ComponentTypeToKey } from '@/features/Configurator'
import { ProductSpecsMap } from '@/entities/ProductDetails'

export type ISpecs<C extends ComponentTypes> = Partial<
  Record<keyof (typeof ProductSpecsMap)[ComponentTypeToKey[C]], string | number>
>

export interface IProduct<C extends ComponentTypes = ComponentTypes> {
  id: string
  name: string
  description: string
  categoryId: string
  price: number
  discountPrice: number
  rating: number
  reviews: number
  images: string[]
  quantity?: number
  specs?: ISpecs<C>
  componentType: C
}
