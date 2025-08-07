import { PageLayout } from '@/widgets/PageLayout'
import cls from './CatalogPage.module.less'

const CatalogPage = () => {
  return (
    <PageLayout>
      <div className={cls.catalogPage}>
        <div className={cls.catalogPage__header}>
          <div>
            <h2 className={cls.catalogPage__title}>Каталог</h2>
            <p className={cls.catalogPage__description}>
              Выберите категорию для просмотра товаров
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

export default CatalogPage
