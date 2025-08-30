import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CategoryPage } from '@/pages/CategoryPage'

const meta: Meta<typeof CategoryPage> = {
  title: 'Pages/CategoryPage',
  component: CategoryPage,
}

export default meta

type Story = StoryObj<typeof CategoryPage>

export const Default: Story = {}
