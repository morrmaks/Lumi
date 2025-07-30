import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useNavigate } from 'react-router-dom'
import cls from './ErrorPage.module.less'
import { classNames } from '@/shared/lib/classNames'

interface ErrorPageProps {
  onResetError: () => void
}

export const ErrorPage = ({ onResetError }: ErrorPageProps) => {
  const navigate = useNavigate()

  function reloadPage() {
    location.reload()
  }

  function toMainDelivery() {
    onResetError()
    navigate('/')
  }

  return (
    <div className={cls.errorPage}>
      <h2 className={cls.errorPage__title}>Что то пошло не так.</h2>
      <div className={cls.errorPage__actions}>
        <Button className={cls.errorPage__button} onClick={reloadPage}>
          Обновить страницу
        </Button>
        <Button
          theme={ButtonTheme.STATIC}
          className={classNames(cls.errorPage__button, {}, [
            cls.errorPage__button_main,
          ])}
          onClick={toMainDelivery}
        >
          На главную
        </Button>
      </div>
    </div>
  )
}
