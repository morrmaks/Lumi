import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ForgotPasswordPage } from '@/pages/ForgotPassword'

const meta: Meta<typeof ForgotPasswordPage> = {
  title: 'Pages/ForgotPasswordPage',
  component: ForgotPasswordPage,
}

export default meta

type Story = StoryObj<typeof ForgotPasswordPage>

export const Default: Story = {}
