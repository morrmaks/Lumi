import { IConfiguratorComponent } from '@/features/Configurator'

export const getTotalConfigPrice = (
  components: IConfiguratorComponent[] | undefined
) => {
  if (!components) return 0
  return Object.values(components)
    .filter((component) => component !== null)
    .reduce((acc, component) => acc + (component?.discountPrice ?? 0), 0)
}
