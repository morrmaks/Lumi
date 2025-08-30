import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ProductSpecs, ProductSpecsProps } from './ProductSpecs'
import { ComponentTypes } from '@/features/Configurator'

const meta: Meta<typeof ProductSpecs> = {
  title: 'Entities/ProductDetails/ProductSpecs',
  component: ProductSpecs,
}

export default meta

type Story = StoryObj<ProductSpecsProps<ComponentTypes>>

export const Default: Story = {
  args: {
    specs: {
      cores: 8,
      threads: 16,
      baseClock: '4.5',
      boostClock: '5.4',
      tdp: 105,
      socket: 'AM5',
    },
    componentType: ComponentTypes.CPU,
  },
}
