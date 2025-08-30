import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import '@/app/styles/index.less'
import { Select, SelectOption, SelectProps } from './Select'

export default {
  title: 'Shared/Select',
  component: Select,
} as Meta<typeof Select>

type OptionType = 'apple' | 'banana' | 'orange'

type Story = StoryObj<SelectProps<OptionType>>

const options: SelectOption<OptionType>[] = [
  { value: 'apple', content: 'Яблоко' },
  { value: 'banana', content: 'Банан' },
  { value: 'orange', content: 'Апельсин' },
]

const SelectExample = () => {
  const [value, setValue] = useState<OptionType>('apple')
  return <Select value={value} options={options} onChange={setValue} />
}

export const Interactive: Story = {
  render: () => <SelectExample />,
}
