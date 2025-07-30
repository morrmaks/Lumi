import { AppLink } from '@/shared/ui/AppLink'
import { getRouteMain } from '@/shared/consts/router'
import cls from './BreadcrumbNav.module.less'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { useResolvedBreadcrumbs } from '@/shared/lib/hooks'

export const BreadcrumbNav = () => {
  const crumbs = useResolvedBreadcrumbs()

  if (crumbs.length === 0) return null

  return (
    <nav className={cls.breadcrumbNav}>
      <ul className={cls.breadcrumbNav__list}>
        <li>
          <AppLink to={getRouteMain()} className={cls.breadcrumbNav__item_link}>
            Главная
          </AppLink>
        </li>
        {crumbs.map(({ name, path, isLast }, index) => {
          return (
            <li key={path} className={cls.breadcrumbNav__item}>
              <Icon Svg={IconsMap.CHEVRON_RIGHT} />
              {isLast ? (
                <span className={cls.breadcrumbNav__currentPath}>{name}</span>
              ) : (
                <AppLink to={path} className={cls.breadcrumbNav__item_link}>
                  {name}
                </AppLink>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
