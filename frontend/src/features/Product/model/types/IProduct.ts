import { ComponentNames } from '@/features/Configurator'

export interface ISpec {
  label: string
  value: string | number
}

export interface IProduct {
  id: string
  images: string[]
  title: string
  description: string
  specs: ISpec[]
  rating: string
  reviews: number
  discountPrice: number
  price: number
  componentName: ComponentNames
}
