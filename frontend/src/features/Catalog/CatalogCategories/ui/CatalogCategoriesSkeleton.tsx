import cls from './CatalogCategories.module.less'
import { classNames } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useBreakpoint } from '@/shared/lib/hooks'

interface CatalogCategoriesProps {
  compact?: boolean
  grid?: boolean
  className?: string
}

export const CatalogCategoriesSkeleton = ({
  compact = false,
  grid = true,
  className,
}: CatalogCategoriesProps) => {
  const { sm } = useBreakpoint()

  if (compact) {
    return (
      <ul
        className={classNames(
          cls.catalogCategories,
          {
            [cls.catalogCategories__grid]: grid,
          },
          [className]
        )}
      >
        {[...new Array(8)].map((_, index) => (
          <Skeleton
            height={sm ? 180 : 150}
            width={sm ? 150 : 110}
            key={index}
            className={classNames(
              cls.catalogCategories__card,
              { [cls.catalogCategories__card_compact]: compact },
              []
            )}
          />
        ))}
      </ul>
    )
  }
  return (
    <ul
      className={classNames(
        cls.catalogCategories,
        {
          [cls.catalogCategories__grid]: grid,
        },
        []
      )}
    >
      {[...new Array(8)].map((_, index) => (
        <Skeleton
          height={160}
          key={index}
          className={classNames(
            cls.catalogCategories__card,
            { [cls.catalogCategories__card_compact]: compact },
            []
          )}
        />
      ))}
    </ul>
  )
}
