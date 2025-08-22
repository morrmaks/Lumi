import { EmptyConfigureComponentsMap } from '../consts'
import { IConfiguratorComponent } from '@/features/Configurator'

export const createConfiguratorComponentsMap = (
  components: IConfiguratorComponent[] | undefined
) => {
  const componentsMap = { ...EmptyConfigureComponentsMap }
  if (!components || components.length === 0) return componentsMap

  components.forEach(
    (component) => (componentsMap[component.componentType] = component)
  )
  return componentsMap
}
