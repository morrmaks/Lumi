import cls from './MobileNavBar.module.less'
import { MenuItem } from '@/shared/ui/MenuItem'
import { MobileNavBarLinksConfig } from '../config/MobileNavBarLinks'

export const MobileNavBar = () => {
  return (
    <nav className={cls.mobileNavBar}>
      {MobileNavBarLinksConfig.map(({ to, icon, label }) => (
        <MenuItem key={to} to={to} Svg={icon} className={cls.mobileNavBar_item}>
          {label}
        </MenuItem>
      ))}
    </nav>
  )
}
