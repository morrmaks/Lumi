import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ResetPasswordForm } from '@/features/Auth'

const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Features/Auth/ResetPasswordForm',
  component: ResetPasswordForm,
}

export default meta

type Story = StoryObj<typeof ResetPasswordForm>

export const Default: Story = {}
