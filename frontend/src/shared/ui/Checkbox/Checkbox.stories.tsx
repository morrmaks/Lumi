import { Checkbox, CheckboxProps, CheckboxType } from './Checkbox'
import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import '@/app/styles/index.less'

export default {
  title: 'Shared/Checkbox',
  component: Checkbox,
  checkboxType: {
    control: 'select',
    options: Object.values(CheckboxType),
  },
  checked: {
    control: 'boolean',
  },
} as Meta<typeof Checkbox>

type Story = StoryObj<CheckboxProps>

const CheckboxExample = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(args.checked ?? false)
  return <Checkbox {...args} checked={checked} onChange={setChecked} />
}

export const Default: Story = {
  render: (args) => <CheckboxExample {...args} />,
  args: {
    checkboxType: CheckboxType.CHECK,
    checked: false,
  },
}

export const Toggle: Story = {
  render: (args) => <CheckboxExample {...args} />,
  args: {
    checkboxType: CheckboxType.TOGGLE,
    checked: false,
  },
}
