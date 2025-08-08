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

const ConfiguratorPage = () => {
  const { components } = useAppSelector(getConfiguratorComponentsState)
  const { total, filled, progress } = getConfiguratorProgress(components)

  return (
    <PageLayout>
      <div className={cls.configuratorPage}>
        <div className={cls.configuratorPage__header}>
          <h2 className={cls.configuratorPage__title}>Конфигуратор ПК</h2>
          <p className={cls.configuratorPage__description}>
            Соберите идеальный компьютер под ваши задачи и бюджет
          </p>
        </div>

        <div className={cls.configuratorPage__content}>
          <div className={cls.configuratorPage__components}>
            <div className={cls.configuratorPage__components_header}>
              <div className={cls.configuratorPage__components_headerContainer}>
                <h3 className={cls.configuratorPage__components_title}>
                  Компоненты сборки
                </h3>
                <p className={cls.configuratorPage__components_componentCounts}>
                  {filled} из {total} выбрано
                </p>
              </div>
              <Progress value={progress} />
              <div></div>
            </div>
            <div className={cls.configuratorPage__componentList_container}>
              <ConfiguratorComponents />
            </div>
          </div>

          <div className={cls.configuratorPage__total}>
            <h3 className={cls.configuratorPage__total_title}>
              Итого по сборке
            </h3>
            <div className={cls.configuratorPage__total_details}>
              <div className={cls.configuratorPage__total_componentCounts}>
                <span>Выбрано компонентов:</span>
                <span>
                  {filled}/{total}
                </span>
              </div>
              <div className={cls.configuratorPage__total_compatibility}>
                <span>Совместимость:</span>
                <span>Отлично</span>
              </div>
            </div>
            <div className={cls.configuratorPage__totalPrice}>
              <span className={cls.configuratorPage__totalPrice_title}>
                Общая стоимость:
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
                Заказать сборку
              </Button>
              <Button
                theme={ButtonTheme.OUTLINE}
                className={cls.configuratorPage__totalButtons_button}
              >
                Сохранить конфигурацию
              </Button>
            </div>
            <div className={cls.configuratorPage__recommendation}>
              <h4 className={cls.configuratorPage__recommendation_title}>
                Рекомендации:
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
