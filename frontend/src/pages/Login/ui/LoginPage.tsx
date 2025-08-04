import cls from './LoginPage.module.less'
import { LoginForm } from '@/features/Login'
import { PageLayout } from '@/widgets/PageLayout'

const LoginPage = () => {
  return (
    <PageLayout noPadding>
      <div className={cls.loginPage}>
        <h2 className={cls.loginPage__title}>Вход в аккаунт</h2>
        <LoginForm />
      </div>
    </PageLayout>
  )
}

export default LoginPage
