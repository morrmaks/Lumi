import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import ProfilePage from './ProfilePage'

const meta: Meta<typeof ProfilePage> = {
  title: 'Pages/ProfilePage',
  component: ProfilePage,
}
export default meta

type Story = StoryObj<typeof ProfilePage>

export const Default: Story = {}
