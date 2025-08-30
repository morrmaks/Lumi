import { Icon, type IconProps } from './Icon'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import '@/app/styles/index.less'
import { IconsMap, IconsMapKeys, IconTheme } from '@/shared/consts'

export default {
  title: 'Shared/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(IconsMap),
    },
    theme: {
      control: 'select',
      options: Object.values(IconTheme),
    },
  },
} as Meta<typeof Icon>

type Story = StoryObj<IconProps & { icon: IconsMapKeys; theme: IconTheme }>

export const Default: Story = {
  argTypes: {
    icon: { control: 'select', options: Object.keys(IconsMap) },
    theme: { control: 'select', options: Object.values(IconTheme) },
  },
  args: {
    icon: 'CONFIGURATOR',
    theme: IconTheme.PRIMARY,
  },
  render: ({ icon, theme }) => {
    const Svg = IconsMap[icon as IconsMapKeys]

    return (
      <div>
        {Svg ? <Icon theme={theme} Svg={Svg} /> : <span>Icon not found</span>}
      </div>
    )
  },
}
