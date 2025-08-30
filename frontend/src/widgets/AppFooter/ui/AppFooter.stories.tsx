import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { AppFooter } from '@/widgets/AppFooter'

const meta: Meta<typeof AppFooter> = {
  title: 'Widgets/AppFooter',
  component: AppFooter,
}

export default meta

type Story = StoryObj<typeof AppFooter>

export const Default: Story = {}
