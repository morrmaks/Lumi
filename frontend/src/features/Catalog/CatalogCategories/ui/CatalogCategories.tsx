import cls from './CatalogCategories.module.less'
import { CatalogCategoriesConfig } from '@/features/Catalog'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogCategory } from '@/shared/consts/router'
import { classNames, getIconTheme } from '@/shared/lib/utils'

interface CatalogCategoriesProps {
  compact?: boolean
  className?: string
  grid?: boolean
}

export const CatalogCategories = ({
  compact = false,
  grid = true,
  className,
}: CatalogCategoriesProps) => {
  if (compact) {
    return (
      <ul
        className={classNames(
          cls.catalogCategories,
          {
            [cls.catalogCategories__grid]: grid,
          },
          [className]
        )}
      >
        {CatalogCategoriesConfig.map(({ label, icon, route }) => (
          <AppLink
            key={route}
            to={getRouteCatalogCategory(route)}
            className={classNames(cls.catalogCategories__card, {}, [
              cls.catalogCategories__card_compact,
            ])}
          >
            <Icon
              Svg={IconsMap[icon]}
              theme={getIconTheme(icon)}
              className={classNames(cls.catalogCategories__icon, {}, [
                cls.catalogCategories__icon_compact,
              ])}
            />
            <h3
              className={classNames(cls.catalogCategories__title, {}, [
                cls.catalogCategories__title_compact,
              ])}
            >
              {label}
            </h3>
          </AppLink>
        ))}
      </ul>
    )
  }

  return (
    <ul
      className={classNames(
        cls.catalogCategories,
        {
          [cls.catalogCategories__grid]: grid,
        },
        [className]
      )}
    >
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
