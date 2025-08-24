import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Input } from '@/shared/ui/Input'
import { Placeholders } from '@/shared/consts'
import { classNames } from '@/shared/lib/utils'
import cls from './AddressInput.module.less'
import { useGetSuggestionsQuery } from '@/shared/api'
import { useDebounceValue } from '@/shared/lib/hooks'

interface AddressInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string
  value: string
  onChange: (value: string | ChangeEvent<HTMLInputElement>) => void
}

export const AddressInput = forwardRef<HTMLInputElement, AddressInputProps>(
  ({ id, onChange, value, ...otherProps }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [suggestionsShow, setSuggesionsShow] = useState(false)
    const debounceValue = useDebounceValue(value)
    const { data: suggestions, isFetching } = useGetSuggestionsQuery(
      debounceValue,
      { skip: !debounceValue }
    )

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value)
      setSuggesionsShow(true)
    }

    const handleSelect = (value: string) => {
      console.log(value)
      onChange(value)
      setSuggesionsShow(false)
    }

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setSuggesionsShow(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
      <div className={cls.addressInput__container} ref={containerRef}>
        <Input
          ref={ref}
          id={id ?? 'address'}
          type={'text'}
          value={value}
          placeholder={Placeholders.features.order.addressInput.placeholder}
          className={classNames(cls.addressInput, {}, [])}
          onChange={handleChange}
          {...otherProps}
        />
        {suggestionsShow && value && suggestions && suggestions.length > 0 && (
          <ul className={cls.addressInput__suggestions}>
            {suggestions?.map((suggestion, i) => (
              <li
                key={suggestion + i}
                className={cls.addressInput__suggestion}
                onClick={() => handleSelect(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
)

AddressInput.displayName = 'AddressInput'
