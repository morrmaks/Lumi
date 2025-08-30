import { ComponentTypes, IConfiguratorComponent } from '@/features/Configurator'
import {
  ConfiguratorComponentCardCompact,
  ConfiguratorComponentCardFull,
} from '@/entities/Configurator'

export interface ConfiguratorComponentCardProps {
  componentName: ComponentTypes
  component: IConfiguratorComponent
  compact?: boolean
  routeItem: string
  routeCategory: string
}

export const ConfiguratorComponentCard = ({
  componentName,
  component,
  compact = false,
  routeItem,
  routeCategory,
}: ConfiguratorComponentCardProps) => {
  if (compact)
    return (
      <ConfiguratorComponentCardCompact
        componentName={componentName}
        component={component}
        routeItem={routeItem}
        routeCategory={routeCategory}
      />
    )

  return (
    <ConfiguratorComponentCardFull
      componentName={componentName}
      component={component}
      routeItem={routeItem}
      routeCategory={routeCategory}
    />
  )
}
