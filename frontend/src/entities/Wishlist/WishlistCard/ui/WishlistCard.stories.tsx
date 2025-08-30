import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { WishlistCard } from '@/entities/Wishlist'
import { WishlistCardProps } from './WishlistCard'

const wishlistCard = {
  id: '68a3b2e65bdf077011e8d7d9',
  name: 'Corsair H115i RGB Platinum',
  categorySlug: 'coolers',
  price: 11200,
  discountPrice: 10600,
  rating: 4.7,
  reviews: 40,
  image:
    'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cooler/corsair-h115i-front.webp',
}

const meta: Meta<typeof WishlistCard> = {
  title: 'Entities/Wishlist/WishlistCard',
  component: WishlistCard,
}

export default meta

type Story = StoryObj<WishlistCardProps>

export const Default: Story = {
  args: {
    card: wishlistCard,
  },
}

export const LoadingDeleteCard: Story = {
  args: {
    card: wishlistCard,
    isLoadingDeleteWishlistProduct: true,
  },
}
