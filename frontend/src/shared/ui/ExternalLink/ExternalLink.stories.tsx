import { ExternalLink, ExternalLinkProps } from './ExternalLink'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import '@/app/styles/index.less'
import { Icon } from '../Icon'
import { IconsMap } from '@/shared/consts'

export default {
  title: 'Shared/ExternalLink',
  component: ExternalLink,
} as Meta<typeof ExternalLink>

type Story = StoryObj<ExternalLinkProps>

export const Default: Story = {
  args: {
    children: <Icon Svg={IconsMap.FACEBOOK} />,
  },
}
