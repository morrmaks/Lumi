import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { AppLink, AppLinkProps } from './AppLink'

export default {
  title: 'Shared/AppLink',
  component: AppLink,
} as Meta<typeof AppLink>

type Story = StoryObj<AppLinkProps>

export const Default: Story = {
  args: {
    to: '/',
    children: 'AppLink',
    theme: 'primary',
  },
}
