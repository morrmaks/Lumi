import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { Progress, ProgressProps } from '@/shared/ui/Progress/Progress'

export default {
  title: 'Shared/Progress',
  component: Progress,
  argTypes: {
    value: { control: 'range', min: 0, max: 100 },
  },
} as Meta<typeof Progress>

type Story = StoryObj<ProgressProps>

export const Default: Story = {
  args: {
    value: 50,
  },
}

export const Full: Story = {
  args: {
    value: 100,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
  },
}
