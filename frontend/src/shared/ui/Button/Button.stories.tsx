import { Button, ButtonProps, ButtonSize, ButtonTheme } from './Button'
import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'

export default {
  title: 'Shared/Button',
  component: Button,
  argTypes: {
    theme: {
      control: 'select',
      options: Object.values(ButtonTheme),
    },
    size: {
      control: 'select',
      options: Object.values(ButtonSize),
    },
  },
} as Meta<typeof Button>

type Story = StoryObj<ButtonProps>

export const Size_s: Story = {
  args: {
    children: 'Size_s',
    size: ButtonSize.S,
  },
}

export const Size_m: Story = {
  args: {
    children: 'Size_m',
    size: ButtonSize.M,
  },
}

export const Size_l: Story = {
  args: {
    children: 'Size_l',
    size: ButtonSize.L,
  },
}

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    theme: ButtonTheme.PRIMARY,
    size: ButtonSize.M,
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    theme: ButtonTheme.SECONDARY,
  },
}

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    theme: ButtonTheme.OUTLINE,
  },
}

export const Static: Story = {
  args: {
    children: 'Static Button',
    theme: ButtonTheme.STATIC,
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    theme: ButtonTheme.DANGER,
  },
}

export const Square: Story = {
  args: {
    children: '≡',
    theme: ButtonTheme.PRIMARY,
    square: true,
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width',
    theme: ButtonTheme.PRIMARY,
    fullWidth: true,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    theme: ButtonTheme.PRIMARY,
    disabled: true,
  },
}
