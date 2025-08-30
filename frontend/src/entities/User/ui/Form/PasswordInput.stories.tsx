import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { PasswordInput } from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'Entities/User/PasswordInput',
  component: PasswordInput,
}

export default meta

type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {}
