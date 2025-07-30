import cls from './ForgotPasswordPage.module.less'
import { ForgotPasswordForm } from '@/features/ForgotPassword'
import { PageLayout } from '@/widgets/PageLayout'

const ForgotPasswordPage = () => {
  return (
    <PageLayout>
      <div className={cls.forgotPasswordPage}>
        <h2 className={cls.forgotPasswordPage__title}>Восстановление пароля</h2>
        <ForgotPasswordForm />
      </div>
    </PageLayout>
  )
}

export default ForgotPasswordPage
