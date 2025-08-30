import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ResetPasswordPage } from '@/pages/ResetPassword'

const meta: Meta<typeof ResetPasswordPage> = {
  title: 'Pages/ResetPasswordPage',
  component: ResetPasswordPage,
}
export default meta

type Story = StoryObj<typeof ResetPasswordPage>

export const Allowed: Story = {
  parameters: {
    initialState: {
      forgotPassword: {
        isForgotPassword: true,
        email: 'user@example.com',
      },
    },
  },
}

export const NotAllowed: Story = {
  parameters: {
    initialState: {
      forgotPassword: {
        isForgotPassword: false,
        email: '',
      },
    },
  },
}
