import cls from './RegisterPage.module.less'
import { RegisterForm } from '@/features/Register'
import { PageLayout } from '@/widgets/PageLayout'

const RegisterPage = () => {
  return (
    <PageLayout>
      <div className={cls.registerPage}>
        <h2 className={cls.registerPage__title}>Регистрация</h2>
        <RegisterForm />
      </div>
    </PageLayout>
  )
}

export default RegisterPage
