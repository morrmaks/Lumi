import { BurgerButton, type BurgerButtonProps } from './BurgerButton'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import '@/app/styles/index.less'

export default {
  title: 'Shared/BurgerButton',
  component: BurgerButton,
} as Meta<typeof BurgerButton>

type Story = StoryObj<BurgerButtonProps>

export const Size_s: Story = {
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Story />
      </div>
    ),
  ],
}
