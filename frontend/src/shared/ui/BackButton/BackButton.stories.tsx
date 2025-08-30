import { BackButton, type BackButtonProps } from './BackButton'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import '@/app/styles/index.less'
import { ButtonTheme } from '@/shared/ui/Button'
import { IconsMap } from '@/shared/consts'
import { Icon } from '../Icon'

export default {
  title: 'Shared/BackButton',
  component: BackButton,
} as Meta<typeof BackButton>

type Story = StoryObj<BackButtonProps>

export const Default: Story = {
  args: {
    children: 'Назад',
  },
}

export const SecondaryTheme: Story = {
  args: {
    children: 'Назад',
    theme: ButtonTheme.SECONDARY,
  },
}

export const OnlyIcon: Story = {
  args: {
    children: <Icon Svg={IconsMap.CHEVRON_RIGHT} />,
  },
}

export const CustomClass: Story = {
  args: {
    children: 'Назад',
    className: 'my-custom-class',
  },
}
