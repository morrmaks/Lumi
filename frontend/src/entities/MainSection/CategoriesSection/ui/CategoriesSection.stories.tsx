import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import { CategoriesSection } from './CategoriesSection'

const meta: Meta<typeof CategoriesSection> = {
  title: 'Entities/MainSection/CategoriesSection',
  component: CategoriesSection,
}

export default meta

type Story = StoryObj<typeof CategoriesSection>

export const Default: Story = {}
