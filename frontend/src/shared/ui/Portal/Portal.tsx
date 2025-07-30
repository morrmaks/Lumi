import { createPortal } from 'react-dom'
import { ReactNode } from 'react'

interface PortalProps {
  element?: HTMLElement
  children?: ReactNode
}

export const Portal = ({ element = document.body, children }: PortalProps) => {
  return createPortal(children, element)
}
