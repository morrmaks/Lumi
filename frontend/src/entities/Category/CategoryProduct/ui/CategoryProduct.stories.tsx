import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CategoryProduct, CategoryProductProps } from './CategoryProduct'
import { ViewFormat } from '@/pages/CategoryPage'
import { ComponentTypes } from '@/features/Configurator'

const product = {
  id: '68a0eac25bdf077011e8a80e',
  name: 'Intel Core i7-13700K',
  image:
    'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/i7-13700k-front.webp',
  rating: 4.7,
  reviews: 95,
  price: 44900,
  discountPrice: 41900,
  componentType: ComponentTypes.CPU,
}

const meta: Meta<typeof CategoryProduct> = {
  title: 'Entities/Category/CategoryProduct',
  component: CategoryProduct,
}

export default meta

type Story = StoryObj<CategoryProductProps>

export const Grid: Story = {
  args: {
    product: product,
    view: ViewFormat.GRID,
  },
}

export const List: Story = {
  args: {
    product: product,
    view: ViewFormat.LIST,
  },
}
