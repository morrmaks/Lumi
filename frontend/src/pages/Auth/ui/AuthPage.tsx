import { Outlet, useLocation } from 'react-router-dom'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteAuthLogin, getRouteAuthRegister } from '@/shared/consts/router'
import { Suspense } from 'react'
import cls from './AuthPage.module.less'
import { classNames } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui/Skeleton'
import { PageLayout } from '@/widgets/PageLayout'

const AuthPage = () => {
  const location = useLocation()
  const isLoginPage = location.pathname.endsWith(getRouteAuthLogin())
  const isRegisterPage = location.pathname.endsWith(getRouteAuthRegister())

  return (
    <PageLayout>
      <div className={cls.authPage}>
        <div className={cls.authPage__header}>
          <h1 className={cls.authPage__title}>Вход в аккаунт</h1>
          <p className={cls.authPage__description}>
            Войдите в свой аккаунт или создайте новый
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
              Вход
            </AppLink>
            <AppLink
              to={getRouteAuthRegister()}
              className={classNames(
                cls.authPage__toggleButton,
                { [cls.authPage__toggleButton_active]: isRegisterPage },
                []
              )}
            >
              Регистрация
            </AppLink>
          </div>
        ) : null}
        <Suspense
          fallback={<Skeleton width="672px" height="320px" border="10px" />}
        >
          <Outlet />
        </Suspense>
      </div>
    </PageLayout>
  )
}

export default AuthPage
