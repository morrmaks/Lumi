import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { Loader, LoaderProps } from './Loader'

export default {
  title: 'Shared/Loader',
  component: Loader,
  argTypes: {
    delay: { control: 'number' },
  },
} as Meta<typeof Loader>

type Story = StoryObj<LoaderProps>

export const Default: Story = {
  args: {
    delay: 500,
  },
}

export const LongerDelay: Story = {
  args: {
    delay: 2000,
  },
}
