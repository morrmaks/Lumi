import { useNavigate } from 'react-router-dom'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { classNames } from '@/shared/lib/utils'
import cls from './NotFoundPage.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { PopularSectionsConfig } from '../config/PopularSections'

const NotFoundPage = () => {
  const navigate = useNavigate()

  function goBackPage() {
    const isInternalNavigation =
      (window.history.state && window.history.state.idx > 0) ||
      (document.referrer && document.referrer.includes(window.location.origin))

    if (isInternalNavigation) {
      navigate(-1)
    } else {
      navigate('/')
    }
  }

  function toMainDelivery() {
    navigate('/')
  }

  return (
    <div className={cls.notFoundPage}>
      <div className={cls.notFoundPage__container}>
        <span className={cls.notFoundPage__code}>404</span>
        <h2 className={cls.notFoundPage__title}>Страница не найдена</h2>
        <p className={cls.notFoundPage__description}>
          К сожалению, запрашиваемая страница не существует или была перемещена.
          Возможно, в адресе допущена ошибка.
        </p>
        <div className={cls.notFoundPage__actions}>
          <Button className={cls.notFoundPage__button} onClick={goBackPage}>
            <Icon
              Svg={IconsMap.HOME}
              className={cls.notFoundPage__button_icon}
            />
            На главную
          </Button>
          <Button
            theme={ButtonTheme.STATIC}
            className={classNames(cls.notFoundPage__button, {}, [
              cls.notFoundPage__button_main,
            ])}
            onClick={toMainDelivery}
          >
            Назад
          </Button>
        </div>
        <div className={cls.notFoundPage__popular}>
          <h3>Популярные разделы:</h3>
          <ul className={cls.notFoundPage__popular_list}>
            {PopularSectionsConfig.map(({ to, label }) => (
              <li key={to}>
                <AppLink to={to}>{label}</AppLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
