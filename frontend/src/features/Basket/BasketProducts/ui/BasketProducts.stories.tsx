import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { BasketProducts } from '@/features/Basket'

const meta: Meta<typeof BasketProducts> = {
  title: 'Features/Basket/BasketProducts',
  component: BasketProducts,
}

export default meta

type Story = StoryObj<typeof BasketProducts>

export const Default: Story = {}
