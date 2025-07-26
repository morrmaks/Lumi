import { getRouteMain } from '@/shared/consts/router'
import { Link } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames'
import cls from './Logo.module.less'

console.log(cls)

export const Logo = () => {
  return (
    <Link to={getRouteMain()} className={cls.logo}>
      <span className={classNames(cls.logo__text, {}, [])}>Lumi</span>
    </Link>
  )
}
