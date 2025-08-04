import { ResetPasswordForm } from '@/features/ResetPassword'
import cls from './ResetPasswordPage.module.less'
import { Navigate } from 'react-router-dom'
import { getRouteMain } from '@/shared/consts/router'
import { PageLayout } from '@/widgets/PageLayout'

const ResetPasswordPage = () => {
  const isAllowed = true
  const email = 'morozov.maksm20@uandex.ru'

  if (!isAllowed) {
    return <Navigate to={getRouteMain()} replace />
  }

  return (
    <PageLayout noPadding>
      <div className={cls.resetPasswordPage}>
        <div className={cls.resetPasswordPage__header}>
          <h2 className={cls.resetPasswordPage__title}>Сброс пароля</h2>
          <p className={cls.resetPasswordPage__description}>
            {`Введите код из письма, отправленного по адресу ${email} и установите новый пароль`}
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </PageLayout>
  )
}

export default ResetPasswordPage
