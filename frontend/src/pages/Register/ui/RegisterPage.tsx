import cls from './RegisterPage.module.less'
import { RegisterForm } from '@/features/Auth/Register'
import { PageLayout } from '@/widgets/PageLayout'
import { Placeholders } from '@/shared/consts'
import { Seo } from '@/shared/lib/components'

const RegisterPage = () => {
  return (
    <PageLayout noPadding>
      <Seo title="Регистрация" />
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
