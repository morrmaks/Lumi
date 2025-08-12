import cls from './ProductImages.module.less'
import { AppImage } from '@/shared/ui/AppImage'
import { classNames } from '@/shared/lib/utils'
import { IProduct } from '@/pages/ProductPage'
import { useCallback, useState } from 'react'

interface ProductImagesProps {
  product: IProduct
}

export const ProductImages = ({ product }: ProductImagesProps) => {
  const {
    id,
    images,
    title,
    description,
    specs,
    rating,
    reviews,
    discountPrice,
    price,
  } = product
  const [fullImage, setFullImage] = useState<{ src: string; index: number }>({
    src: images[0],
    index: 0,
  })

  const changeFullImage = useCallback((image: string, index: number) => {
    setFullImage((prev) => {
      if (prev.index === index) return prev
      return { src: image, index }
    })
  }, [])

  return (
    <div className={cls.productImages}>
      <div className={cls.productImages__selector}>
        {product.images.map((image, i) => (
          <AppImage
            key={image}
            src={image}
            alt={title}
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
          src={fullImage.src}
          alt={title}
          className={cls.productImages__fullImage}
        />
      </div>
    </div>
  )
}
