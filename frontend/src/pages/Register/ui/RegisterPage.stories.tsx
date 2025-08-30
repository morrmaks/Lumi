import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import RegisterPage from './RegisterPage'

const meta: Meta<typeof RegisterPage> = {
  title: 'Pages/RegisterPage',
  component: RegisterPage,
}
export default meta

type Story = StoryObj<typeof RegisterPage>

export const Default: Story = {}
