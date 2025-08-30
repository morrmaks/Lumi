import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { WishlistPage } from '@/pages/Wishlist'

export default {
  title: 'Pages/Wishlist',
  component: WishlistPage,
} as Meta<typeof WishlistPage>

type Story = StoryObj<typeof WishlistPage>

export const Default: Story = {}
