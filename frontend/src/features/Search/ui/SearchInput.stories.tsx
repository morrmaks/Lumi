import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { SearchInput } from '@/features/Search'

const meta: Meta<typeof SearchInput> = {
  title: 'Features/Search/SearchInput',
  component: SearchInput,
}

export default meta

type Story = StoryObj<typeof SearchInput>

export const Default: Story = {}
