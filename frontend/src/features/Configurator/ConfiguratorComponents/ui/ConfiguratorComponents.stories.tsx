import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ConfiguratorComponents } from '@/features/Configurator'
import { ConfiguratorComponentsProps } from '@/features/Configurator/ConfiguratorComponents/ui/ConfiguratorComponents'

const meta: Meta<typeof ConfiguratorComponents> = {
  title: 'Features/Configurator/ConfiguratorComponents',
  component: ConfiguratorComponents,
}

export default meta

type Story = StoryObj<ConfiguratorComponentsProps>

export const Default: Story = {}

export const Carousel: Story = {
  args: {
    carousel: true,
  },
}
