import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { OrderPage } from '@/pages/Order'

const meta: Meta<typeof OrderPage> = {
  title: 'Pages/OrderPage',
  component: OrderPage,
}

export default meta

type Story = StoryObj<typeof OrderPage>

export const Allowed: Story = {
  parameters: {
    initialState: {
      order: {
        isFromOrderLink: true,
      },
    },
  },
}

export const NotAllowed: Story = {
  parameters: {
    initialState: {
      order: {
        isFromOrderLink: false,
      },
    },
  },
}
