import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ThemeSwitcher, ThemeSwitcherProps } from './ThemeSwitcher'

export default {
  title: 'Shared/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    onClick: { action: 'clicked' },
  },
} as Meta<typeof ThemeSwitcher>

type Story = StoryObj<ThemeSwitcherProps>

export const Default: Story = {
  args: {},
}
