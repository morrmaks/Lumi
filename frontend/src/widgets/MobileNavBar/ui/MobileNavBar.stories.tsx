import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { MobileNavBar } from '@/widgets/MobileNavBar'

const meta: Meta<typeof MobileNavBar> = {
  title: 'Widgets/MobileNavBar',
  component: MobileNavBar,
}

export default meta

type Story = StoryObj<typeof MobileNavBar>

export const Default: Story = {}
