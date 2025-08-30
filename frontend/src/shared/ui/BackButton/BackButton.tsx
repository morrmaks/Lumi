import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/utils'
import cls from './BackButton.module.less'
import { useNavigate } from 'react-router-dom'
import { ReactNode, useCallback } from 'react'

export interface BackButtonProps {
  className?: string
  children?: ReactNode
  theme?: ButtonTheme
}

export const BackButton = ({
  className,
  children,
  theme = ButtonTheme.STATIC,
}: BackButtonProps) => {
  const navigate = useNavigate()

  const goBackPage = useCallback(() => {
    const isInternalNavigation =
      (window.history.state && window.history.state.idx > 0) ||
      (document.referrer && document.referrer.includes(window.location.origin))

    if (isInternalNavigation) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }, [])

  return (
    <Button
      theme={theme}
      className={classNames(cls.backButton, {}, [className])}
      onClick={goBackPage}
    >
      {children}
    </Button>
  )
}
