import { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import '@/app/styles/index.less'
import { Modal, ModalProps } from './Modal'

export default {
  title: 'Shared/Modal',
  component: Modal,
  argTypes: {
    delay: { control: 'number' },
  },
} as Meta<typeof Modal>

type Story = StoryObj<ModalProps>

export const Default: Story = {
  render: () => {
    const ModalExample = () => {
      const [isOpen, setIsOpen] = useState(false)

      console.log(isOpen)
      return (
        <>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
          {isOpen && (
            <Modal onClose={() => setIsOpen(false)}>
              <h2>Modal Title</h2>
              <p>Some content inside the modal</p>
            </Modal>
          )}
        </>
      )
    }

    return <ModalExample />
  },
}
