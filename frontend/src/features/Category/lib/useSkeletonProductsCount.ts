import { useBreakpoint } from '@/shared/lib/hooks'

export const useSkeletonProductsCount = () => {
  const { sm, md } = useBreakpoint()
  if (md) return 4
  if (sm) return 3
  return 2
}
