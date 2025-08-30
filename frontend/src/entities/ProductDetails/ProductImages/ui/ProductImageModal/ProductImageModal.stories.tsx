import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProductImageModal } from './ProductImageModal'

const meta: Meta<typeof ProductImageModal> = {
  title: 'Entities/ProductDetails/ProductImageModal',
  component: ProductImageModal,
}

export default meta

type Story = StoryObj<typeof ProductImageModal>

export const Default: Story = {
  args: {
    isOpen: true,
    images: [
      'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/ryzen7-7700x-front.webp',
      'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/ryzen7-7700x-back.webp',
    ],
  },
}
