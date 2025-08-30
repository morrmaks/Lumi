import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProfileAvatar } from '@/features/Profile'

const meta: Meta<typeof ProfileAvatar> = {
  title: 'Features/Profile/ProfileAvatar',
  component: ProfileAvatar,
}

export default meta

type Story = StoryObj<typeof ProfileAvatar>

export const hasUser: Story = {
  parameters: {
    initialState: {
      user: {
        user: {
          name: 'Имя',
          avatarUrl:
            'https://images.unsplash.com/photo-1735405817208-79a2fd79e18b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
      },
    },
  },
}

export const hasNotUser: Story = {
  parameters: {
    initialState: {
      user: {
        user: {
          name: '',
          avatarUrl: '',
        },
      },
    },
  },
}
