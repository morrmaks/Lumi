import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import '@/app/styles/index.less'
import { Input, InputProps } from './Input'
import { IconsMap } from '@/shared/consts'

export default {
  title: 'Shared/Input',
  component: Input,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(IconsMap),
    },
  },
} as Meta<typeof Input>

type Story = StoryObj<InputProps>

const DefaultExample = (args: InputProps) => {
  const [value, setValue] = useState('')
  return <Input {...args} value={value} onChangeString={setValue} />
}

const WithIconExample = (args: InputProps) => {
  const [value, setValue] = useState('')
  return (
    <Input {...args} icon="SEARCH" value={value} onChangeString={setValue} />
  )
}

const FileInputExample = (args: InputProps) => {
  const [file, setFile] = useState<string | File | null>(null)
  return <Input {...args} type="file" onChangeFile={setFile} />
}

export const Default: Story = {
  render: (args) => <DefaultExample />,
}

export const WithIcon: Story = {
  render: (args) => <WithIconExample />,
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Cannot edit',
  },
}

export const FileInput: Story = {
  render: (args) => <FileInputExample />,
}
