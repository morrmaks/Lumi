import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ForgotPasswordForm } from '@/features/Auth'

const meta: Meta<typeof ForgotPasswordForm> = {
  title: 'Features/Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
}

export default meta

type Story = StoryObj<typeof ForgotPasswordForm>

export const Default: Story = {}
