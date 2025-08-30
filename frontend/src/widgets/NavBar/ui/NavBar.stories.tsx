import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { NavBar } from '@/widgets/NavBar'

const meta: Meta<typeof NavBar> = {
  title: 'Widgets/NavBar',
  component: NavBar,
}

export default meta

type Story = StoryObj<typeof NavBar>

export const Default: Story = {}
