import { Portal } from '../Portal'
import cls from './Modal.module.less'
import { ReactNode, useEffect } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'

interface ModalProps {
  onClose: () => void
  children?: ReactNode
}

const modalRoot = document.getElementById('modal')

export const Modal = ({ onClose, children }: ModalProps) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  if (!modalRoot) return null
  return (
    <Portal element={modalRoot}>
      <div className={cls.modal} onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={cls.modal__container}
        >
          <Icon
            Svg={IconsMap.CLOSE}
            onClick={onClose}
            className={cls.modal__closeIcon}
          />
          {children}
        </div>
      </div>
    </Portal>
  )
}
