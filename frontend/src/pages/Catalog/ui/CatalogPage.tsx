import { PageLayout } from '@/widgets/PageLayout'
import cls from './CatalogPage.module.less'
import { CatalogCategories } from '@/features/Catalog'
import { Placeholders } from '@/shared/consts'
import { Seo } from '@/shared/lib/components'

const CatalogPage = () => {
  return (
    <PageLayout>
      <Seo title="Каталог" />
      <div className={cls.catalogPage}>
        <div className={cls.catalogPage__header}>
          <div>
            <h2 className={cls.catalogPage__title}>
              {Placeholders.pages.catalog.mainText}
            </h2>
            <p className={cls.catalogPage__description}>
              {Placeholders.pages.catalog.describeText}
            </p>
          </div>
        </div>

        <div className={cls.catalogPage__categories}>
          <CatalogCategories />
        </div>
      </div>
    </PageLayout>
  )
}

export default CatalogPage
