import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProductOrderCard, ProductCardProps } from './ProductOrderCard'

const meta: Meta<typeof ProductOrderCard> = {
  title: 'Entities/Order/ProductOrderCard',
  component: ProductOrderCard,
}

export default meta

type Story = StoryObj<ProductCardProps>

export const Default: Story = {
  args: {
    card: {
      id: '123',
      name: 'AMD Ryzen 9 7950X',
      price: 11111,
      image:
        'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/ryzen7-7700x-front.webp',
      quantity: 3,
      categorySlug: 'processors',
    },
  },
}
