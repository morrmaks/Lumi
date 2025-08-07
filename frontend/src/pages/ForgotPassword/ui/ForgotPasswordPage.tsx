import cls from './ForgotPasswordPage.module.less'
import { ForgotPasswordForm } from '@/features/Auth/ForgotPassword'
import { PageLayout } from '@/widgets/PageLayout'

const ForgotPasswordPage = () => {
  return (
    <PageLayout noPadding>
      <div className={cls.forgotPasswordPage}>
        <div className={cls.forgotPasswordPage__header}>
          <h2 className={cls.forgotPasswordPage__title}>
            Восстановление пароля
          </h2>
          <p className={cls.forgotPasswordPage__description}>
            Введите email, который был указан при регистрации. Мы отправим вам
            код для восстановления пароля.
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </PageLayout>
  )
}

export default ForgotPasswordPage
