import cls from './CatalogCategories.module.less'
import { CatalogCategoryIcons } from '@/features/Catalog'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteCatalogCategory } from '@/shared/consts/router'
import { classNames, getIconTheme } from '@/shared/lib/utils'
import { useGetCategoriesQuery } from '@/features/Category'
import { CatalogCategoriesMap, Placeholders } from '@/shared/consts'
import { CatalogCategoriesSkeleton } from '@/features/Catalog/CatalogCategories/ui/CatalogCategoriesSkeleton'

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
  const { data, isLoading } = useGetCategoriesQuery()

  if (isLoading)
    return (
      <CatalogCategoriesSkeleton
        grid={grid}
        compact={compact}
        className={className}
      />
    )

  if (!data) return <div>Категории не найдены</div>

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
        {data.map(({ id, name, slug, productCount }) => {
          const icon = CatalogCategoryIcons[slug as CatalogCategoriesMap]

          return (
            <AppLink
              key={id}
              to={getRouteCatalogCategory(slug)}
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
                {name}
              </h3>
              <p className={cls.catalogCategories__productCount}>
                {`${Placeholders.features.catalog.categories.productsQuantity} ${productCount}`}
              </p>
            </AppLink>
          )
        })}
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
      {data.map(({ id, name, description, slug }) => {
        const icon = CatalogCategoryIcons[slug as CatalogCategoriesMap]

        return (
          <AppLink
            key={id}
            to={getRouteCatalogCategory(slug)}
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
              <h3 className={cls.catalogCategories__title}>{name}</h3>
            </div>
            <p className={cls.catalogCategories__description}>{description}</p>
          </AppLink>
        )
      })}
    </ul>
  )
}
