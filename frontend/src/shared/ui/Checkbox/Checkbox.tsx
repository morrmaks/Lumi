import { useState } from 'react'
import cls from './Checkbox.module.less'
import { classNames } from '@/shared/lib/classNames'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'

interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export const Checkbox = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = checked !== undefined

  const isChecked = isControlled ? checked : internalChecked

  function toggleChecked() {
    const newChecked = !isChecked
    if (!isControlled) setInternalChecked(newChecked)
    onChange(newChecked)
  }

  return (
    <button
      role="checkbox"
      aria-checked={isChecked}
      onClick={toggleChecked}
      className={classNames(
        cls.checkbox,
        { [cls.checkbox__checked]: isChecked },
        [className]
      )}
    >
      <Icon
        Svg={IconsMap.CHECK_MARK}
        className={classNames(cls.checkbox__icon, {
          [cls.checkbox__checked_icon]: isChecked,
        })}
      />
    </button>
  )
}
