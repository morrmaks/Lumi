import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import {
  ConfiguratorEmptyComponentCard,
  ConfiguratorComponentCardProps,
} from './ConfiguratorEmptyComponentCard'
import { ConfiguratorComponentsConfig } from '@/features/Configurator'

const meta: Meta<typeof ConfiguratorEmptyComponentCard> = {
  title: 'Entities/Configurator/ConfiguratorEmptyComponentCard',
  component: ConfiguratorEmptyComponentCard,
}

export default meta

type Story = StoryObj<ConfiguratorComponentCardProps>

export const Default: Story = {
  args: {
    componentConfig: ConfiguratorComponentsConfig.processor,
  },
}

export const Compact: Story = {
  args: {
    componentConfig: ConfiguratorComponentsConfig.processor,
    compact: true,
  },
}
