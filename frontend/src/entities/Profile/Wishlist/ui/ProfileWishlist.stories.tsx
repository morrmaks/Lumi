import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProfileWishlist } from './ProfileWishlist'

const meta: Meta<typeof ProfileWishlist> = {
  title: 'Entities/Profile/ProfileWishlist',
  component: ProfileWishlist,
}

export default meta

type Story = StoryObj<typeof ProfileWishlist>

export const Default: Story = {}
