import cls from './ProductImageModal.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { Modal } from '@/shared/ui/Modal'
import { ApiMap } from '@/shared/consts'

interface ProductImageModalProps {
  onClose: () => void
  images: string[]
  alt: string
  isOpen: boolean
}

export const ProductImageModal = ({
  onClose,
  images,
  alt,
  isOpen,
}: ProductImageModalProps) => {
  if (!isOpen) return null

  return (
    <Modal onClose={onClose} className={cls.productImageModal}>
      {images.map((src) => (
        <AppImage
          key={src}
          src={`${ApiMap.STATIC}${src}`}
          alt={alt}
          className={cls.productImageModal__image}
        />
      ))}
    </Modal>
  )
}
