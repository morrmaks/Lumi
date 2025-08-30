import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { OrderForm } from '@/features/Order'

const meta: Meta<typeof OrderForm> = {
  title: 'Features/Order/OrderForm',
  component: OrderForm,
}

export default meta

type Story = StoryObj<typeof OrderForm>

export const Default: Story = {}
