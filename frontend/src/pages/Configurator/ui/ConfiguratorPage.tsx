import { PageLayout } from '@/widgets/PageLayout'
import cls from './ConfiguratorPage.module.less'

const ConfiguratorPage = () => {
  return (
    <PageLayout>
      <div className={cls.configuratorPage}>
        <div className={cls.configuratorPage__header}>
          <div>
            <h2 className={cls.configuratorPage__title}>Конфигуратор ПК</h2>
            <p className={cls.configuratorPage__description}>
              Соберите идеальный компьютер под ваши задачи и бюджет
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default ConfiguratorPage
