import cls from './ProductImages.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { classNames } from '@/shared/lib/utils'
import { useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '@/shared/lib/hooks'
import { getProductCard } from '@/pages/ProductPage'
import {
  ProductImageModal,
  ProductImagesSkeleton,
} from '@/entities/ProductDetails'

interface ProductImagesProps {
  isLoading: boolean
}

export const ProductImages = ({ isLoading }: ProductImagesProps) => {
  const { images, name } = useAppSelector(getProductCard)
  const [isOpen, setOpen] = useState(false)
  const [fullImage, setFullImage] = useState<{ src: string; index: number }>({
    src: '',
    index: 0,
  })

  useEffect(() => {
    if (images) {
      setFullImage({ src: images[0], index: 0 })
    }
  }, [images])

  const changeFullImage = useCallback((image: string, index: number) => {
    setFullImage((prev) => {
      if (prev.index === index) return prev
      return { src: image, index }
    })
  }, [])

  const handleImageModalClose = useCallback(() => {
    setOpen(false)
  }, [])

  const handleImageModalOpen = useCallback(() => {
    setOpen(true)
  }, [])

  if (isLoading) return <ProductImagesSkeleton />

  return (
    <div className={cls.productImages}>
      <div className={cls.productImages__selector}>
        {images.map((image, i) => (
          <AppImage
            key={image}
            src={image}
            alt={name}
            onClick={changeFullImage}
            index={i}
            className={classNames(cls.productImages__image, {
              [cls.productImages__image_active]: i === fullImage.index,
            })}
          />
        ))}
      </div>
      <div className={cls.productImages__fullImage_container}>
        <AppImage
          src={fullImage.src ?? images[0]}
          alt={name}
          onClick={handleImageModalOpen}
          className={cls.productImages__fullImage}
        />
      </div>
      <ProductImageModal
        isOpen={isOpen}
        onClose={handleImageModalClose}
        images={images}
        alt={name}
      />
    </div>
  )
}
