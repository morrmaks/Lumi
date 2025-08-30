import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { SettingList } from './SettingList'

const meta: Meta<typeof SettingList> = {
  title: 'Entities/Profile/Settings/SettingList',
  component: SettingList,
}

export default meta

type Story = StoryObj<typeof SettingList>

export const Default: Story = {}
