import '@/app/styles/index.less'
import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { ProfileCardForm, ProfileCardFormProps } from './ProfileCardForm'
import { ApiError } from '@/shared/types'
import { InputProps } from '@/shared/ui/Input/Input'

const meta: Meta<typeof ProfileCardForm> = {
  title: 'Features/Profile/ProfileCardForm',
  component: ProfileCardForm,
}

export default meta
type Story = StoryObj<ProfileCardFormProps>

const DefaultExample = (args: InputProps) => {
  const methods = useForm({
    defaultValues: {
      name: 'Имя пользователя',
      email: 'user@example.com',
      phone: '+79991234567',
    },
  })

  return (
    <FormProvider {...methods}>
      <ProfileCardForm disabled={false} apiErrors={undefined} />
    </FormProvider>
  )
}

const DisabledExample = (args: InputProps) => {
  const methods = useForm({
    defaultValues: {
      name: 'Имя пользователя',
      email: 'user@example.com',
      phone: '+79991234567',
    },
  })

  return (
    <FormProvider {...methods}>
      <ProfileCardForm disabled={true} apiErrors={undefined} />
    </FormProvider>
  )
}

const WithErrorsExample = (args: InputProps) => {
  const methods = useForm({
    defaultValues: {
      name: '',
      email: 'invalid-email',
      phone: '123',
    },
  })

  const apiError: ApiError = {
    status: 400,
    data: {
      message: 'Ошибка API при обновлении профиля',
    },
  }

  return (
    <FormProvider {...methods}>
      <ProfileCardForm disabled={false} apiErrors={apiError} />
    </FormProvider>
  )
}

export const Default: Story = {
  render: () => <DefaultExample />,
}

export const Disabled: Story = {
  render: () => <DisabledExample />,
}

export const WithErrors: Story = {
  render: () => <WithErrorsExample />,
}
