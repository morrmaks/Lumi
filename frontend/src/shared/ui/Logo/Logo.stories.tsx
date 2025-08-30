import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { Logo } from './Logo'

export default {
  title: 'Shared/Logo',
  component: Logo,
  argTypes: {
    delay: { control: 'number' },
  },
} as Meta<typeof Logo>

type Story = StoryObj<typeof Logo>

export const Default: Story = {}
