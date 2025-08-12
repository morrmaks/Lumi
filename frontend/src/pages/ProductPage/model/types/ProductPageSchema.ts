import { ComponentNames } from '@/features/Configurator'

export interface IProduct {
  id: string
  images: string[]
  title: string
  description: string
  specs: Record<string, string | number>
  rating: string
  reviews: string
  discountPrice: number
  price: number
  componentName: ComponentNames
}
