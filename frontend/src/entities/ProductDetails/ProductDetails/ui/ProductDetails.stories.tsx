import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProductDetails, ProductDetailsProps } from './ProductDetails'

const meta: Meta<typeof ProductDetails> = {
  title: 'Entities/ProductDetails/Details',
  component: ProductDetails,
}

export default meta

type Story = StoryObj<ProductDetailsProps>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
