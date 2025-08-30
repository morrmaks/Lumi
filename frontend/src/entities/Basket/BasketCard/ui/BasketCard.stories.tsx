import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { BasketCard, BasketCardProps } from './BasketCard'

const card = {
  id: '68a0eac25bdf077011e8a80f',
  name: 'AMD Ryzen 9 7950X',
  image:
    'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/ryzen9-7950x-front.webp',
  price: 69900,
  discountPrice: 65900,
  rating: 4.8,
  reviews: 112,
  quantity: 1,
  categorySlug: 'processors',
}

const meta: Meta<typeof BasketCard> = {
  title: 'Entities/Basket/BasketCard',
  component: BasketCard,
}

export default meta

type Story = StoryObj<BasketCardProps>

export const Default: Story = {
  args: {
    card: card,
  },
}
