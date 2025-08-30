import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProfileSettings } from './ProfileSettings'

const meta: Meta<typeof ProfileSettings> = {
  title: 'Entities/Profile/Settings/ProfileSettings',
  component: ProfileSettings,
}

export default meta

type Story = StoryObj<typeof ProfileSettings>

export const Default: Story = {}
