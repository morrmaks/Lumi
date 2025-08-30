import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { MainPage } from '@/pages/Main'

const meta: Meta<typeof MainPage> = {
  title: 'Pages/MainPage',
  component: MainPage,
}

export default meta

type Story = StoryObj<typeof MainPage>

export const Default: Story = {}
