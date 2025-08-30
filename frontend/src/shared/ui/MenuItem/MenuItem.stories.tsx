import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { MenuItem, MenuItemProps } from '@/shared/ui/MenuItem/MenuItem'
import { IconsMap } from '@/shared/consts'

export default {
  title: 'Shared/MenuItem',
  component: MenuItem,
  argTypes: {
    Svg: { control: false }, // не пытаемся выбирать SVG через контрол, так как это React-компонент
    horizontal: { control: 'boolean' },
    children: { control: 'text' },
    to: { control: 'text' },
  },
} as Meta<typeof MenuItem>

type Story = StoryObj<MenuItemProps>

export const Default: Story = {
  args: {
    to: '/',
    children: 'Home',
    horizontal: false,
    Svg: IconsMap.HOME,
  },
}

export const Horizontal: Story = {
  args: {
    to: '/catalog',
    children: 'Catalog',
    horizontal: true,
    Svg: IconsMap.CATALOG,
  },
}
