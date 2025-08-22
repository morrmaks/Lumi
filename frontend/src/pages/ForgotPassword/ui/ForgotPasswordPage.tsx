import cls from './ForgotPasswordPage.module.less'
import { ForgotPasswordForm } from '@/features/Auth/ForgotPassword'
import { PageLayout } from '@/widgets/PageLayout'
import { Placeholders } from '@/shared/consts'

const ForgotPasswordPage = () => {
  return (
    <PageLayout noPadding>
      <div className={cls.forgotPasswordPage}>
        <div className={cls.forgotPasswordPage__header}>
          <h3 className={cls.forgotPasswordPage__title}>
            {Placeholders.pages.forgotPassword.mainText}
          </h3>
          <p className={cls.forgotPasswordPage__description}>
            {Placeholders.pages.forgotPassword.describeText}
          </p>
        </div>
        <ForgotPasswordForm />
      </div>
    </PageLayout>
  )
}

export default ForgotPasswordPage
