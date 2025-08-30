import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProductImages, type ProductImagesProps } from './ProductImages'

const meta: Meta<typeof ProductImages> = {
  title: 'Entities/ProductDetails/ProductImages',
  component: ProductImages,
}

export default meta

type Story = StoryObj<ProductImagesProps>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
