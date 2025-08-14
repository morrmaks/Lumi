import { PageLayout } from '@/widgets/PageLayout'
import cls from './ConfiguratorPage.module.less'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Progress } from '@/shared/ui/Progress'
import {
  ConfiguratorComponents,
  getConfiguratorComponentsState,
} from '@/features/Configurator'
import { useAppSelector } from '@/shared/lib/hooks'
import {
  getConfiguratorProgress,
  getTotalConfigPrice,
} from '@/pages/Configurator'
import { Loader } from '@/shared/ui/Loader'
import { Suspense } from 'react'
import { Placeholders } from '@/shared/consts'

const ConfiguratorPage = () => {
  const { components } = useAppSelector(getConfiguratorComponentsState)
  const { total, filled, progress } = getConfiguratorProgress(components)

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
                {getTotalConfigPrice(components)} ₽
              </span>
            </div>
            <div className={cls.configuratorPage__totalButtons}>
              <Button
                className={cls.configuratorPage__totalButtons_button}
                onClick={() => {}}
              >
                {Placeholders.pages.configurator.total.onPlaceAnOrder}
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.configuratorPage__totalButtons_button}
              >
                {Placeholders.pages.configurator.total.onCopyLinkConfig}
              </Button>
            </div>
            <div className={cls.configuratorPage__recommendation}>
              <h4 className={cls.configuratorPage__recommendation_title}>
                {Placeholders.pages.configurator.total.recommendation}
              </h4>
              <ul className={cls.configuratorPage__recommendation_list}>
                <li>• Добавьте систему охлаждения</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ConfiguratorPage
