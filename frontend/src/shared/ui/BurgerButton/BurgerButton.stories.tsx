import { BurgerButton, type BurgerButtonProps } from './BurgerButton'
import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'

export default {
  title: 'Shared/BurgerButton',
  component: BurgerButton,
} as Meta<typeof BurgerButton>

type Story = StoryObj<BurgerButtonProps>

export const Default: Story = {}

export const Active: Story = {
  args: {
    isOpen: true,
  },
}
