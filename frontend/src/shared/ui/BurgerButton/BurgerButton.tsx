import { Button, ButtonTheme } from '@/shared/ui/Button'
import cls from './BurgerButton.module.less'
import { classNames } from '@/shared/lib/utils'
import { useAppDispatch } from '@/shared/lib/hooks'
import { slideMenuActions } from '@/entities/SlideMenu'

export interface BurgerButtonProps {
  className?: string
  isOpen?: boolean
}

export const BurgerButton = ({
  className,
  isOpen = false,
}: BurgerButtonProps) => {
  const dispatch = useAppDispatch()

  return (
    <Button
      data-testid="burger-button"
      theme={ButtonTheme.STATIC}
      square={true}
      resetPadding={true}
      className={classNames(
        cls.burgerButton,
        { [cls.burgerButton_open]: isOpen },
        [className]
      )}
      onClick={() => dispatch(slideMenuActions.setIsOpen(!isOpen))}
    >
      <span className={cls.burgerButton__line}></span>
    </Button>
  )
}
