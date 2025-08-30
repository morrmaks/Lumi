import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { AddressInput } from '@/features/Order'

const meta: Meta<typeof AddressInput> = {
  title: 'Features/Order/AddressInput',
  component: AddressInput,
}

export default meta

type Story = StoryObj<typeof AddressInput>

export const Default: Story = {}
