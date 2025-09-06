import { Outlet, useLocation } from 'react-router-dom'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteAuthLogin, getRouteAuthRegister } from '@/shared/consts/router'
import { Suspense } from 'react'
import cls from './AuthPage.module.less'
import { classNames } from '@/shared/lib/utils'
import { PageLayout } from '@/widgets/PageLayout'
import { Placeholders } from '@/shared/consts'
import { AuthFormSkeleton } from '@/pages/Auth'
import { Seo } from '@/shared/lib/components'

const AuthPage = () => {
  const location = useLocation()
  const isLoginPage = location.pathname.endsWith(getRouteAuthLogin())
  const isRegisterPage = location.pathname.endsWith(getRouteAuthRegister())

  return (
    <PageLayout>
      <Seo title="Авторизация" />
      <div className={cls.authPage}>
        <div className={cls.authPage__header}>
          <h2 className={cls.authPage__title}>
            {Placeholders.pages.auth.mainText}
          </h2>
          <p className={cls.authPage__description}>
            {Placeholders.pages.auth.describeText}
          </p>
        </div>
        {isLoginPage || isRegisterPage ? (
          <div className={cls.authPage__toggle}>
            <AppLink
              to={getRouteAuthLogin()}
              className={classNames(
                cls.authPage__toggleButton,
                { [cls.authPage__toggleButton_active]: isLoginPage },
                []
              )}
            >
              {Placeholders.pages.auth.tabs.loginTab}
            </AppLink>
            <AppLink
              to={getRouteAuthRegister()}
              className={classNames(
                cls.authPage__toggleButton,
                { [cls.authPage__toggleButton_active]: isRegisterPage },
                []
              )}
            >
              {Placeholders.pages.auth.tabs.registerTab}
            </AppLink>
          </div>
        ) : null}
        <Suspense fallback={<AuthFormSkeleton />}>
          <Outlet />
        </Suspense>
      </div>
    </PageLayout>
  )
}

export default AuthPage
