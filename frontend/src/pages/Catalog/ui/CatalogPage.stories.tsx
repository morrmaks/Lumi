import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CatalogPage } from '@/pages/Catalog'

const meta: Meta<typeof CatalogPage> = {
  title: 'Pages/CatalogPage',
  component: CatalogPage,
}

export default meta

type Story = StoryObj<typeof CatalogPage>

export const Default: Story = {}
