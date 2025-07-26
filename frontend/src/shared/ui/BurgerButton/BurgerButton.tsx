import { Button } from '@/shared/ui/Button'
import cls from './BurgerButton.module.less'
import { useState } from 'react'
import { classNames } from '@/shared/lib/classNames'

interface BurgerButtonProps {
  className?: string
}

export const BurgerButton = ({ className }: BurgerButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Button
      className={classNames(
        cls.burgerButton,
        { [cls.burgerButton_animate]: isOpen },
        [className]
      )}
      onClick={() => {
        setIsOpen(!isOpen)
      }}
    >
      <span className={cls.burgerButton__line}></span>
    </Button>
  )
}
