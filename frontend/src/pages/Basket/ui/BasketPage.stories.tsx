import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { BasketPage } from '@/pages/Basket'

const meta: Meta<typeof BasketPage> = {
  title: 'Pages/BasketPage',
  component: BasketPage,
}

export default meta

type Story = StoryObj<typeof BasketPage>

export const Default: Story = {}
