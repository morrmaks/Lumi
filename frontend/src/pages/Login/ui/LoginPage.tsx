import cls from './LoginPage.module.less'
import { LoginForm } from '@/features/Auth/Login'
import { PageLayout } from '@/widgets/PageLayout'
import { Placeholders } from '@/shared/consts'

const LoginPage = () => {
  return (
    <PageLayout noPadding>
      <div className={cls.loginPage}>
        <h3 className={cls.loginPage__title}>
          {Placeholders.pages.login.mainText}
        </h3>
        <LoginForm />
      </div>
    </PageLayout>
  )
}

export default LoginPage
