import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { NotFoundPage } from '@/pages/NotFound'

const meta: Meta<typeof NotFoundPage> = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPage,
}

export default meta

type Story = StoryObj<typeof NotFoundPage>

export const Default: Story = {}
