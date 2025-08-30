import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { WishlistProducts } from '@/features/Wishlist'

const meta: Meta<typeof WishlistProducts> = {
  title: 'Features/Wishlist/WishlistProducts',
  component: WishlistProducts,
}

export default meta

type Story = StoryObj<typeof WishlistProducts>

export const Default: Story = {}
