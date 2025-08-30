import { Meta, StoryObj } from '@storybook/react'
import '@/app/styles/index.less'
import {
  ApiErrorMessage,
  ApiErrorMessageProps,
} from '@/shared/ui/ApiErrorMessage/ApiErrorMessage'

export default {
  title: 'Shared/ApiErrorMessage',
  component: ApiErrorMessage,
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} as Meta<typeof ApiErrorMessage>

type Story = StoryObj<ApiErrorMessageProps>

export const NoError: Story = {
  args: {
    error: undefined,
  },
}

export const SingleError: Story = {
  args: {
    error: {
      status: 400,
      data: {
        message: 'Something went wrong',
        errors: {},
      },
    },
  },
}

export const MultipleErrors: Story = {
  args: {
    error: {
      status: 400,
      data: {
        message: 'Validation failed',
        errors: {
          email: 'Email is required',
          password: 'Password must be at least 6 characters',
        },
      },
    },
  },
}
