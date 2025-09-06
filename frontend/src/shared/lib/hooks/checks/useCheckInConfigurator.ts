import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { getConfiguratorComponentsList } from '@/features/Configurator'

export const useCheckInConfigurator = (id: string): boolean => {
  const components = useAppSelector(getConfiguratorComponentsList)
  return Object.values(components).some((product) => product === id)
}
