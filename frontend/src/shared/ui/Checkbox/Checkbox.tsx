import { useState } from 'react'
import cls from './Checkbox.module.less'
import { classNames } from '@/shared/lib/utils'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { Mods } from '@/shared/lib/utils/classNames/classNames'

export const CheckboxType = {
  CHECK: 'check',
  TOGGLE: 'toggle',
} as const

export type CheckboxType = (typeof CheckboxType)[keyof typeof CheckboxType]

interface CheckboxProps {
  checked?: boolean
  defaultChecked?: boolean
  onChange: (checked: boolean) => void
  className?: string
  checkboxType?: CheckboxType
}

export const Checkbox = ({
  checked,
  defaultChecked = false,
  onChange,
  className,
  checkboxType = CheckboxType.CHECK,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked)
  const isControlled = checked !== undefined

  const isChecked = isControlled ? checked : internalChecked

  function toggleChecked() {
    const newChecked = !isChecked
    if (!isControlled) setInternalChecked(newChecked)
    onChange(newChecked)
  }

  const mods: Mods = {
    [cls.checkbox__checked]: isChecked,
    [cls[checkboxType]]: true,
  }

  return (
    <button
      role="checkbox"
      aria-checked={isChecked}
      onClick={toggleChecked}
      className={classNames(cls.checkbox, mods, [className])}
    >
      {checkboxType === CheckboxType.CHECK && (
        <Icon
          Svg={IconsMap.CHECK_MARK}
          className={classNames(cls.checkbox__icon, {
            [cls.checkbox__checked_icon]: isChecked,
          })}
        />
      )}
      {checkboxType === CheckboxType.TOGGLE && (
        <span className={cls.checkbox__thumb} />
      )}
    </button>
  )
}
