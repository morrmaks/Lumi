import { classNames } from '@/shared/lib/classNames'
import cls from './Skeleton.module.less'
import { CSSProperties } from 'react'

interface SkeletonProps {
  className?: string
  width?: string | number
  height?: string | number
  border?: string
}

export const Skeleton = ({
  className,
  width,
  height,
  border,
}: SkeletonProps) => {
  const styles: CSSProperties = {
    width,
    height,
    borderRadius: border,
  }

  return (
    <div
      className={classNames(cls.skeleton, {}, [className])}
      style={styles}
    ></div>
  )
}
