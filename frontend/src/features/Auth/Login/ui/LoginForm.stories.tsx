import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { LoginForm } from '@/features/Auth'

const meta: Meta<typeof LoginForm> = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
}

export default meta

type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}
