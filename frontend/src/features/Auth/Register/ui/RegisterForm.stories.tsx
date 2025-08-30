import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { RegisterForm } from '@/features/Auth'

const meta: Meta<typeof RegisterForm> = {
  title: 'Features/Auth/RegisterForm',
  component: RegisterForm,
}

export default meta

type Story = StoryObj<typeof RegisterForm>

export const Default: Story = {}
