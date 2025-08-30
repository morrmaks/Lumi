import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CategoryProducts } from '@/features/Category'

const meta: Meta<typeof CategoryProducts> = {
  title: 'Features/Category/CategoryProducts',
  component: CategoryProducts,
}

export default meta

type Story = StoryObj<typeof CategoryProducts>

export const Empty: Story = {}

export const isLoading: Story = {
  args: {
    isLoading: true,
  },
}

export const categoryIsLoading: Story = {
  args: {
    categoryIsLoading: true,
  },
}
