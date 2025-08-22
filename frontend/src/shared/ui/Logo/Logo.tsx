import { getRouteMain } from '@/shared/consts/router'
import { classNames } from '@/shared/lib/utils'
import cls from './Logo.module.less'
import { AppLink } from '@/shared/ui/AppLink'
import { Placeholders } from '@/shared/consts'

export const Logo = () => {
  return (
    <AppLink to={getRouteMain()} className={cls.logo}>
      <span className={classNames(cls.logo__text, {}, [])}>
        {Placeholders.shared.logo.mainText}
      </span>
    </AppLink>
  )
}
