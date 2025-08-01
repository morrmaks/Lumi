import cls from './AppFooter.module.less'
import { Logo } from '@/shared/ui/Logo'
import { AppLink } from '@/shared/ui/AppLink'
import { appFooterLinks } from '../config/appFooterLinks'
import { Icon } from '@/shared/ui/Icon'
import { ExternalLink } from '@/shared/ui/ExternalLink'

export const AppFooter = () => {
  return (
    <footer className={cls.appFooter}>
      <div className={cls.appFooter__info}>
        <div className={cls.appFooter__info_section}>
          <Logo />
          <p>
            Интернет-магазин электроники и комплектующих для ПК. Собираем
            игровые компьютеры мечты с 2020 года.
          </p>
          <ul className={cls.appFooter__socialLinks}>
            {appFooterLinks.socialLinks.map(({ name, href, icon }) => (
              <li key={name}>
                <ExternalLink href={href}>
                  <Icon
                    Svg={icon}
                    className={cls.appFooter__socialLinks_icon}
                  />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={cls.appFooter__info_section}>
          <h3 className={cls.appFooter__sectionTitle}>Быстрые ссылки</h3>
          <nav className={cls.appFooter__menu}>
            {appFooterLinks.quickLinks.map(({ label, to }) => (
              <AppLink key={label} to={to} className={cls.appFooter__menu_item}>
                {label}
              </AppLink>
            ))}
          </nav>
        </div>
        <div className={cls.appFooter__info_section}>
          <h3 className={cls.appFooter__sectionTitle}>Поддержка</h3>
          <nav className={cls.appFooter__menu}>
            {appFooterLinks.supportLinks.map(({ label, to }) => (
              <AppLink key={label} to={to} className={cls.appFooter__menu_item}>
                {label}
              </AppLink>
            ))}
          </nav>
        </div>
        <div className={cls.appFooter__info_section}>
          <h3 className={cls.appFooter__sectionTitle}>Контакты</h3>
          <ul className={cls.appFooter__menu}>
            {appFooterLinks.contacts.map(({ label, icon }) => (
              <li key={label} className={cls.appFooter__contacts_item}>
                <Icon Svg={icon} />
                <p>{label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={cls.appFooter__docs}>
        <p>© 2025 Lumi. Все права защищены</p>
        <ul className={cls.appFooter__docLinks}>
          {appFooterLinks.legalDocs.map(({ label, to }) => (
            <li key={label}>
              <AppLink to={to} className={cls.appFooter__menu_item}>
                {label}
              </AppLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
