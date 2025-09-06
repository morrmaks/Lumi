import { ResetPasswordForm } from '@/features/Auth/ResetPassword'
import cls from './ResetPasswordPage.module.less'
import { Navigate } from 'react-router-dom'
import { getRouteMain } from '@/shared/consts/router'
import { PageLayout } from '@/widgets/PageLayout'
import { useAppSelector } from '@/shared/lib/hooks'
import { Placeholders } from '@/shared/consts'
import { getForgotPasswordEmail, getIsForgotPassword } from '@/features/Auth'
import { Seo } from '@/shared/lib/components'

const ResetPasswordPage = () => {
  const isAllowed = useAppSelector(getIsForgotPassword)
  const email = useAppSelector(getForgotPasswordEmail)

  if (!isAllowed) {
    return <Navigate to={getRouteMain()} replace />
  }

  return (
    <PageLayout noPadding>
      <Seo title="Сброс пароля" />
      <div className={cls.resetPasswordPage}>
        <div className={cls.resetPasswordPage__header}>
          <h3 className={cls.resetPasswordPage__title}>
            {Placeholders.pages.resetPassword.mainText}
          </h3>
          <p className={cls.resetPasswordPage__description}>
            {`${Placeholders.pages.resetPassword.describeFirstPartText} ${email}
              ${Placeholders.pages.resetPassword.describeSecondPartText}`}
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </PageLayout>
  )
}

export default ResetPasswordPage
