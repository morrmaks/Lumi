import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { ErrorPage } from '@/widgets/ErrorPage'

const meta: Meta<typeof ErrorPage> = {
  title: 'Widgets/ErrorPage',
  component: ErrorPage,
}

export default meta

type Story = StoryObj<typeof ErrorPage>

export const Default: Story = {}
