import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { SearchPage } from '@/pages/Search'

export default {
  title: 'Pages/Search',
  component: SearchPage,
} as Meta<typeof SearchPage>

type Story = StoryObj<typeof SearchPage>

export const Default: Story = {}
