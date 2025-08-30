import cls from './Loader.module.less'
import { useEffect, useState } from 'react'

export interface LoaderProps {
  delay?: number
}

export const Loader = ({ delay = 500 }: LoaderProps) => {
  const [visible, setVisible] = useState<boolean>()

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div className={cls.loader}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
