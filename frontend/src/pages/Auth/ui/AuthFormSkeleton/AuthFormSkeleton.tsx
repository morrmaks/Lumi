import { Skeleton } from '@/shared/ui/Skeleton'
import cls from './AuthFormSkeleton.module.less'

export const AuthFormSkeleton = () => {
  return (
    <div className={cls.authFormSkeleton}>
      <div className={cls.authFormSkeleton__title}>
        <Skeleton width={160} height={30} border={'6px'} />
      </div>
      <div className={cls.authFormSkeleton__form}>
        <div className={cls.authFormSkeleton__label}>
          <Skeleton width={80} height={20} border={'6px'} />
          <Skeleton
            height={36}
            className={cls.authFormSkeleton__input}
            border={'6px'}
          />
        </div>
        <div className={cls.authFormSkeleton__label}>
          <Skeleton width={80} height={20} border={'6px'} />
          <Skeleton
            height={36}
            className={cls.authFormSkeleton__input}
            border={'6px'}
          />
        </div>
        <Skeleton width={'100%'} height={44} border={'6px'} />
      </div>
    </div>
  )
}
