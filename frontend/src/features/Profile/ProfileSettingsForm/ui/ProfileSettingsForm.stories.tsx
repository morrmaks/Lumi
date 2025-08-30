import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProfileSettingsForm } from '@/features/Profile'

const meta: Meta<typeof ProfileSettingsForm> = {
  title: 'Features/Profile/ProfileSettingsForm',
  component: ProfileSettingsForm,
}

export default meta

type Story = StoryObj<typeof ProfileSettingsForm>

export const Default: Story = {}
