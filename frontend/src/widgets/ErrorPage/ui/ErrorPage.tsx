import { Button, ButtonTheme } from '@/shared/ui/Button'
import { useNavigate } from 'react-router-dom'
import cls from './ErrorPage.module.less'
import { classNames } from '@/shared/lib/utils'
import { Placeholders } from '@/shared/consts'

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
      <h2 className={cls.errorPage__title}>
        {Placeholders.widgets.errorPage.mainText}
      </h2>
      <div className={cls.errorPage__actions}>
        <Button className={cls.errorPage__button} onClick={reloadPage}>
          {Placeholders.widgets.errorPage.onUploadPage}
        </Button>
        <Button
          theme={ButtonTheme.STATIC}
          className={classNames(cls.errorPage__button, {}, [
            cls.errorPage__button_main,
          ])}
          onClick={toMainDelivery}
        >
          {Placeholders.widgets.errorPage.onRouteMain}
        </Button>
      </div>
    </div>
  )
}
