import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { LoginPage } from '@/pages/Login'

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
}

export default meta

type Story = StoryObj<typeof LoginPage>

export const Default: Story = {}
