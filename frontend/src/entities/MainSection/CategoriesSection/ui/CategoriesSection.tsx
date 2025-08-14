import { CatalogCategories } from '@/features/Catalog'
import cls from './CategoriesSection.module.less'
import { getRouteCatalog, IconsMap, Placeholders } from '@/shared/consts'
import { AppLink } from '@/shared/ui/AppLink'
import { Icon } from '@/shared/ui/Icon'

export const CategoriesSection = () => {
  return (
    <div className={cls.categoriesSection}>
      <div className={cls.categoriesSection__header}>
        <h3 className={cls.categoriesSection__title}>
          {Placeholders.entities.mainSection.categories.mainText}
        </h3>
        <AppLink
          to={getRouteCatalog()}
          className={cls.categoriesSection__button}
        >
          {Placeholders.entities.mainSection.categories.onRouteCatalog}
          <Icon
            Svg={IconsMap.CHEVRON_RIGHT}
            className={cls.categoriesSection__button_icon}
          />
        </AppLink>
      </div>
      <div className={cls.categoriesSection__categoriesContainer}>
        <CatalogCategories
          className={cls.categoriesSection__categories}
          compact
          grid={false}
        />
        <div className={cls.categoriesSection__categories_shadow}></div>
      </div>
    </div>
  )
}
