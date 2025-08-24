import { JSX, memo, useEffect, useMemo, useRef, useState } from 'react'
import cls from './Select.module.less'
import { Button, ButtonTheme } from '../Button'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { classNames } from '@/shared/lib/utils'

export interface SelectOption<T> {
  value: T
  content: string
}

interface SelectProps<T extends string> {
  value: T
  options: SelectOption<T>[]
  onChange: (value: T) => void
  className?: string
  placeholder?: string
}

const SelectComponent = <T extends string>({
  value,
  options,
  onChange,
  className,
  placeholder = 'Выберите',
}: SelectProps<T>) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(false)

  const selectedLabel = useMemo(
    () => options.find((opt) => opt.value === value)?.content ?? placeholder,
    [value, options, placeholder]
  )

  function handleSelect(value: T) {
    onChange(value)
    setOpen(false)
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onClick)

    return () => {
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  return (
    <div className={classNames(cls.select, {}, [className])} ref={ref}>
      <Button
        theme={ButtonTheme.STATIC}
        onClick={() => setOpen(!isOpen)}
        className={cls.select__button}
        type={'button'}
      >
        <Icon
          Svg={IconsMap.CHEVRON_UP}
          className={classNames(cls.select__icon, {
            [cls.select__icon_active]: isOpen,
          })}
        />
        {selectedLabel}
      </Button>
      {isOpen && (
        <ul className={cls.select__menu}>
          {options.map((opt) => (
            <li key={opt.value} className={cls.select__menuItem}>
              <Button
                type={'button'}
                className={cls.select__menuItem_button}
                theme={ButtonTheme.STATIC}
                onClick={() => handleSelect(opt.value)}
              >
                {value === opt.value && (
                  <Icon
                    Svg={IconsMap.CHECK_MARK}
                    className={cls.select__menuItem_icon}
                  />
                )}
                {opt.content}
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const Select = memo(SelectComponent) as <T extends string>(
  props: SelectProps<T>
) => JSX.Element
