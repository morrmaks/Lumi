import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CatalogCategories } from '@/features/Catalog'
import { CatalogCategoriesProps } from './CatalogCategories'

const meta: Meta<typeof CatalogCategories> = {
  title: 'Features/Catalog/CatalogCategories',
  component: CatalogCategories,
}

export default meta

type Story = StoryObj<CatalogCategoriesProps>

export const Default: Story = {}

export const Compact: Story = {
  args: {
    compact: true,
  },
}

export const Grid: Story = {
  args: {
    grid: true,
  },
}
