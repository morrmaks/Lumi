import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import ProductPage from './ProductPage'

const meta: Meta<typeof ProductPage> = {
  title: 'Pages/ProductPage',
  component: ProductPage,
}

export default meta

type Story = StoryObj<typeof ProductPage>

export const Default: Story = {}
