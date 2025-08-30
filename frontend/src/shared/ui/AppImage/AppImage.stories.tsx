import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import '@/app/styles/index.less'
import { AppImage, ImageProps } from './AppImage'

export default {
  title: 'Shared/AppImage',
  component: AppImage,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} as Meta<typeof AppImage>

type Story = StoryObj<ImageProps>

const DefaultExample = (args: ImageProps) => {
  const [src, setSrc] = useState(args.src)
  return <AppImage {...args} src={src} />
}

export const Default: Story = {
  render: (args) => <DefaultExample {...args} />,
  args: {
    src: 'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/banners/configurator-promo-block.avif',
    alt: 'Placeholder',
  },
}
