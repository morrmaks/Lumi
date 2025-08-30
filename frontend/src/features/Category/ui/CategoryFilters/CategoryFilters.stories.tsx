import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CategoryFilters } from '@/features/Category'
import { CategoryFiltersProps } from './CategoryFilters'

const meta: Meta<typeof CategoryFilters> = {
  title: 'Features/Category/CategoryFilters',
  component: CategoryFilters,
}

export default meta

type Story = StoryObj<CategoryFiltersProps>

export const Default: Story = {}

export const isLoading: Story = {
  args: {
    categoryIsLoading: true,
  },
}
