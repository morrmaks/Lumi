import { Button } from '@/shared/ui/Button'
import cls from './BurgerButton.module.less'
import { classNames } from '@/shared/lib/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import {
  dropdownMenuActions,
  getDropdownMenuState,
} from '@/entities/DropdownMenu'
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector'

interface BurgerButtonProps {
  className?: string
}

export const BurgerButton = ({ className }: BurgerButtonProps) => {
  const { isOpen: dropdownMenuIsOpen } = useAppSelector(getDropdownMenuState)
  const dispatch = useAppDispatch()

  return (
    <Button
      className={classNames(
        cls.burgerButton,
        { [cls.burgerButton_animate]: dropdownMenuIsOpen },
        [className]
      )}
      onClick={() =>
        dispatch(dropdownMenuActions.setIsOpen(!dropdownMenuIsOpen))
      }
    >
      <span className={cls.burgerButton__line}></span>
    </Button>
  )
}
