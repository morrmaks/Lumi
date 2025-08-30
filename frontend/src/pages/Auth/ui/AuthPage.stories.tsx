import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { AuthPage } from '@/pages/Auth'

const meta: Meta<typeof AuthPage> = {
  title: 'Pages/AuthPage',
  component: AuthPage,
}

export default meta

type Story = StoryObj<typeof AuthPage>

export const Default: Story = {}
