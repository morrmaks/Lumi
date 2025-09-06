import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui/Button'
import cls from './NotFoundPage.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { PopularSectionsConfig } from '../config/PopularSections'
import { BackButton } from '@/shared/ui/BackButton'
import { Placeholders } from '@/shared/consts'
import { Seo } from '@/shared/lib/components'

const NotFoundPage = () => {
  const navigate = useNavigate()

  function toMainDelivery() {
    navigate('/')
  }

  return (
    <>
      <Seo title="Страница не найдена" />
      <div className={cls.notFoundPage}>
        <div className={cls.notFoundPage__container}>
          <span className={cls.notFoundPage__code}>
            {Placeholders.pages.notFound.errorCode}
          </span>
          <h2 className={cls.notFoundPage__title}>
            {Placeholders.pages.notFound.mainText}
          </h2>
          <p className={cls.notFoundPage__description}>
            {Placeholders.pages.notFound.describeText}
          </p>
          <div className={cls.notFoundPage__actions}>
            <Button
              className={cls.notFoundPage__button}
              onClick={toMainDelivery}
            >
              <Icon
                Svg={IconsMap.HOME}
                className={cls.notFoundPage__button_icon}
              />
              {Placeholders.pages.notFound.onRouteMain}
            </Button>
            <BackButton className={cls.notFoundPage__button_main}>
              {Placeholders.pages.notFound.onRouteBack}
            </BackButton>
          </div>
          <div className={cls.notFoundPage__popular}>
            <h3>{Placeholders.pages.notFound.popularSections}</h3>
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
    </>
  )
}

export default NotFoundPage
