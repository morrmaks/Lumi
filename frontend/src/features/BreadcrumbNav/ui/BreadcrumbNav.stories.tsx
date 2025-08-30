import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { BreadcrumbNav } from './BreadcrumbNav'

const meta: Meta<typeof BreadcrumbNav> = {
  title: 'Features/BreadcrumbNav',
  component: BreadcrumbNav,
}

export default meta

type Story = StoryObj<typeof BreadcrumbNav>

export const Default: Story = {}
