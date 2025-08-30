import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { OrderModalProps, ProfileOrderModal } from './ProfileOrderModal'

const meta: Meta<typeof ProfileOrderModal> = {
  title: 'Entities/Order/ProfileOrderModal',
  component: ProfileOrderModal,
}

export default meta

type Story = StoryObj<OrderModalProps>

export const Default: Story = {
  args: {
    card: {
      id: '68b0873226600c4f46d13c30',
      orderNumber: 'H0KLQ6XI',
      total: 183300,
      status: 'paid',
      products: [
        {
          productId: '68a0eac25bdf077011e8a80f',
          quantity: 1,
        },
        {
          productId: '68a0ff2c5bdf077011e8a96f',
          quantity: 2,
        },
        {
          productId: '68a0f9a55bdf077011e8a908',
          quantity: 1,
        },
        {
          productId: '68a0f9a55bdf077011e8a90a',
          quantity: 1,
        },
        {
          productId: '68a1030f5bdf077011e8a9b0',
          quantity: 1,
        },
      ],
      trackNumber: 'TRK-MEVMUYMU-UFSAY1',
      date: 'Thu Aug 28 2025 16:43:30 GMT+0000 (Coordinated Universal Time)',
      address: 'Перу',
      paymentMethod: 'card',
      paymentStatus: 'succeeded',
    },
  },
}
