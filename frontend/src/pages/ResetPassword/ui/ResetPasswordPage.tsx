import { ResetPasswordForm } from '@/features/ResetPassword'
import cls from './ResetPasswordPage.module.less'
import { Navigate } from 'react-router-dom'
import { getRouteMain } from '@/shared/consts/router'
import { PageLayout } from '@/widgets/PageLayout'

const ResetPasswordPage = () => {
  const isAllowed = true

  if (!isAllowed) {
    return <Navigate to={getRouteMain()} replace />
  }

  return (
    <PageLayout>
      <div className={cls.resetPasswordPage}>
        <h2 className={cls.resetPasswordPage__title}>Сброс пароля</h2>
        <ResetPasswordForm />
      </div>
    </PageLayout>
  )
}

export default ResetPasswordPage
