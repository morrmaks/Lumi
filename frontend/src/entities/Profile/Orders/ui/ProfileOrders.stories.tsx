import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProfileOrders } from './ProfileOrders'

const meta: Meta<typeof ProfileOrders> = {
  title: 'Entities/Profile/Orders/ProfileOrders',
  component: ProfileOrders,
}

export default meta

type Story = StoryObj<typeof ProfileOrders>

export const Default: Story = {}
