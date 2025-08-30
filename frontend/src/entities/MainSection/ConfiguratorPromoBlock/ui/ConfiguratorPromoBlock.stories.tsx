import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ConfiguratorPromoBlock } from './ConfiguratorPromoBlock'

const meta: Meta<typeof ConfiguratorPromoBlock> = {
  title: 'Entities/MainSection/ConfiguratorPromoBlock',
  component: ConfiguratorPromoBlock,
}

export default meta

type Story = StoryObj<typeof ConfiguratorPromoBlock>

export const Default: Story = {}
