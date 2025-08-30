import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { BannerCarousel } from './BannerCarousel'

const meta: Meta<typeof BannerCarousel> = {
  title: 'Entities/MainSection/BannerCarousel',
  component: BannerCarousel,
}

export default meta

type Story = StoryObj<typeof BannerCarousel>

export const Default: Story = {}
