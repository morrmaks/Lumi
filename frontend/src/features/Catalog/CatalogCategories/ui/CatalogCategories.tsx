import cls from './CatalogCategories.module.less'
import { CatalogCategoriesConfig } from '@/features/Catalog'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogCategory } from '@/shared/consts/router'
import { getIconTheme } from '@/shared/lib/utils'

export const CatalogCategories = () => {
  return (
    <ul className={cls.catalogCategories}>
      {CatalogCategoriesConfig.map(({ label, description, icon, route }) => (
        <AppLink
          key={route}
          to={getRouteCatalogCategory(route)}
          className={cls.catalogCategories__card}
        >
          <div className={cls.catalogCategories__header}>
            <div className={cls.catalogCategories__icons}>
              <Icon
                Svg={IconsMap[icon]}
                theme={getIconTheme(icon)}
                className={cls.catalogCategories__icon}
              />
              <Icon
                Svg={IconsMap.CHEVRON_RIGHT}
                theme={getIconTheme(icon)}
                className={cls.catalogCategories__icon}
              />
            </div>
            <h3 className={cls.catalogCategories__title}>{label}</h3>
          </div>
          <p className={cls.catalogCategories__description}>{description}</p>
        </AppLink>
      ))}
    </ul>
  )
}
