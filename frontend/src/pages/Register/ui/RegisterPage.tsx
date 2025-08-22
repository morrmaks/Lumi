import cls from './RegisterPage.module.less'
import { RegisterForm } from '@/features/Auth/Register'
import { PageLayout } from '@/widgets/PageLayout'
import { Placeholders } from '@/shared/consts'

const RegisterPage = () => {
  return (
    <PageLayout noPadding>
      <div className={cls.registerPage}>
        <h3 className={cls.registerPage__title}>
          {Placeholders.pages.register.mainText}
        </h3>
        <RegisterForm />
      </div>
    </PageLayout>
  )
}

export default RegisterPage
