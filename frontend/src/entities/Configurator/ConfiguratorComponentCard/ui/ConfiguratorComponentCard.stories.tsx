import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import {
  ConfiguratorComponentCard,
  ConfiguratorComponentCardProps,
} from './ConfiguratorComponentCard'
import { ComponentTypes } from '@/features/Configurator'

const meta: Meta<typeof ConfiguratorComponentCard> = {
  title: 'Entities/Configurator/ConfiguratorComponentCard',
  component: ConfiguratorComponentCard,
}

export default meta

type Story = StoryObj<ConfiguratorComponentCardProps>

export const Default: Story = {
  args: {
    componentName: ComponentTypes.CPU,
    component: {
      id: '68a0eac25bdf077011e8a80f',
      name: 'AMD Ryzen 9 7950X',
      image:
        'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/ryzen9-7950x-front.webp',
      discountPrice: 65900,
      componentType: 'processor',
    },
  },
}

export const Compact: Story = {
  args: {
    componentName: ComponentTypes.CPU,
    component: {
      id: '68a0eac25bdf077011e8a80f',
      name: 'AMD Ryzen 9 7950X',
      image:
        'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/products/cpu/ryzen9-7950x-front.webp',
      discountPrice: 65900,
      componentType: 'processor',
    },
    compact: true,
  },
}
