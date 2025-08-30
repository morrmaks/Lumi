import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProfileCard } from './ProfileCard'

const meta: Meta<typeof ProfileCard> = {
  title: 'Entities/Profile/ProfileCard',
  component: ProfileCard,
}

export default meta

type Story = StoryObj<typeof ProfileCard>

export const Default: Story = {}
