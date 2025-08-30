import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ConfiguratorPage } from '@/pages/Configurator'

const meta: Meta<typeof ConfiguratorPage> = {
  title: 'Pages/ConfiguratorPage',
  component: ConfiguratorPage,
}

export default meta

type Story = StoryObj<typeof ConfiguratorPage>

export const Default: Story = {}
