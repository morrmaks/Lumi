import { Portal } from '../Portal'
import cls from './Modal.module.less'
import { ReactNode, useEffect } from 'react'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { classNames } from '@/shared/lib/utils'

export interface ModalProps {
  onClose: () => void
  children?: ReactNode
  className?: string
}

export const Modal = ({ onClose, children, className }: ModalProps) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalStyle
    }
  }, [])

  const modalRoot = document.getElementById('modal')
  if (!modalRoot) return null
  return (
    <Portal element={modalRoot}>
      <div data-testid="modal" className={cls.modal} onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={classNames(cls.modal__container, {}, [className])}
        >
          <Icon
            data-testid="close-icon"
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
