import cls from './CategoryFilters.module.less'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useBreakpoint } from '@/shared/lib/hooks'

export const CategoryFiltersSkeleton = () => {
  const { sm } = useBreakpoint()

  return (
    <div className={cls.categoryFilters}>
      <div className={cls.categoryFilters__search}>
        <Skeleton height={60} border={'6px'} />
      </div>
      <div className={cls.categoryFilters__sortFilters}>
        <Skeleton height={60} width={100} border={'6px'} />
        {sm && <Skeleton height={60} width={60} border={'6px'} />}
      </div>
    </div>
  )
}
