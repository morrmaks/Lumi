import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { Skeleton, SkeletonProps } from './Skeleton'

export default {
  title: 'Shared/Skeleton',
  component: Skeleton,
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    border: { control: 'text' },
  },
} as Meta<typeof Skeleton>

type Story = StoryObj<SkeletonProps>

export const Default: Story = {
  args: {
    width: '100px',
    height: '20px',
    border: '4px',
  },
}

export const Large: Story = {
  args: {
    width: '300px',
    height: '40px',
    border: '8px',
  },
}

export const Circle: Story = {
  args: {
    width: '150px',
    height: '150px',
    border: '50%',
  },
}
