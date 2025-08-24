import { PageLayout } from '@/widgets/PageLayout'
import cls from './ConfiguratorPage.module.less'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Progress } from '@/shared/ui/Progress'
import {
  ConfiguratorComponents,
  getArrayRecommendations,
  getConfiguratorComponentsList,
  getConfiguratorPrice,
} from '@/features/Configurator'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { getConfiguratorProgress } from '@/pages/Configurator'
import { Loader } from '@/shared/ui/Loader'
import { Suspense, useCallback } from 'react'
import { getRouteAuth, getRouteOrder, Placeholders } from '@/shared/consts'
import { getUserIsAuth } from '@/entities/User'
import { useNavigate } from 'react-router-dom'
import { AppLink } from '@/shared/ui/AppLink'
import { orderActions } from '@/features/Order'

const ConfiguratorPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(getUserIsAuth)
  const price = useAppSelector(getConfiguratorPrice)
  const components = useAppSelector(getConfiguratorComponentsList)
  const { total, filled, progress } = getConfiguratorProgress(components)

  const handleOrder = useCallback(() => {
    const products = Object.values(components)
      .filter((id) => id !== null)
      .map((id) => ({ productId: id, quantity: 1 }))

    dispatch(orderActions.setProducts(products))
    dispatch(orderActions.setIsFromOrderLink(true))
    navigate(getRouteOrder())
  }, [navigate, components])

  return (
    <PageLayout>
      <div className={cls.configuratorPage}>
        <div className={cls.configuratorPage__header}>
          <h2 className={cls.configuratorPage__title}>
            {Placeholders.pages.configurator.mainText}
          </h2>
          <p className={cls.configuratorPage__description}>
            {Placeholders.pages.configurator.describeText}
          </p>
        </div>

        <div className={cls.configuratorPage__content}>
          <div className={cls.configuratorPage__components}>
            <div className={cls.configuratorPage__components_header}>
              <div className={cls.configuratorPage__components_headerContainer}>
                <h3 className={cls.configuratorPage__components_title}>
                  {Placeholders.pages.configurator.sectionComponents.mainText}
                </h3>
                <p className={cls.configuratorPage__components_componentCounts}>
                  {filled} из {total} выбрано
                </p>
              </div>
              <Progress value={progress} />
            </div>
            <div className={cls.configuratorPage__componentList_container}>
              <Suspense fallback={<Loader />}>
                <ConfiguratorComponents />
              </Suspense>
            </div>
          </div>

          <div className={cls.configuratorPage__total}>
            <h3 className={cls.configuratorPage__total_title}>
              {Placeholders.pages.configurator.total.mainText}
            </h3>
            <div className={cls.configuratorPage__total_details}>
              <div className={cls.configuratorPage__total_componentCounts}>
                <span>
                  {Placeholders.pages.configurator.total.componentsQuantity}
                </span>
                <span>
                  {filled}/{total}
                </span>
              </div>
              <div className={cls.configuratorPage__total_compatibility}>
                <span>
                  {Placeholders.pages.configurator.total.compatibility}
                </span>
                <span>Отлично</span>
              </div>
            </div>
            <div className={cls.configuratorPage__totalPrice}>
              <span className={cls.configuratorPage__totalPrice_title}>
                {Placeholders.pages.configurator.total.price}
              </span>
              <span className={cls.configuratorPage__totalPrice_amount}>
                {price} ₽
              </span>
            </div>
            <div className={cls.configuratorPage__totalButtons}>
              <Button
                className={cls.configuratorPage__totalButtons_button}
                onClick={handleOrder}
              >
                {Placeholders.pages.configurator.total.onPlaceAnOrder}
              </Button>
              {!isAuth && (
                <AppLink
                  to={getRouteAuth()}
                  className={cls.configuratorPage__totalButtons_link}
                >
                  <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.configuratorPage__totalButtons_button}
                  >
                    {Placeholders.pages.configurator.total.onCopyLinkConfig}
                  </Button>
                </AppLink>
              )}
            </div>
            <div className={cls.configuratorPage__recommendation}>
              <h4 className={cls.configuratorPage__recommendation_title}>
                {Placeholders.pages.configurator.total.recommendation}
              </h4>
              <ul className={cls.configuratorPage__recommendation_list}>
                {getArrayRecommendations(components).map((recommendation) => (
                  <li key={recommendation}>• {recommendation}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ConfiguratorPage
