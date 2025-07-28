import { getRouteMain } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/classNames'
import cls from './Logo.module.less'
import { AppLink } from '@/shared/ui/AppLink'

export const Logo = () => {
  return (
    <AppLink to={getRouteMain()} className={cls.logo}>
      <span className={classNames(cls.logo__text, {}, [])}>Lumi</span>
    </AppLink>
  )
}
