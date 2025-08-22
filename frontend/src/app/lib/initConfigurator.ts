import { LocalStorage } from '@/shared/consts'
import { useAppDispatch } from '@/shared/lib/hooks'
import {
  IConfiguratorComponentDto,
  ConfiguratorComponentMap,
  configuratorComponentsActions,
  ComponentTypes,
} from '@/features/Configurator'
import { getConfiguratorComponentIds, typedEntries } from '@/shared/lib/utils'

export const initConfigurator = async (
  isAuth: boolean,
  configuratorComponents: IConfiguratorComponentDto[] | undefined,
  setConfigurator: (components: string[]) => {
    unwrap: () => Promise<IConfiguratorComponentDto[]>
  },
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  if (!isAuth) {
    const localConfigurator = localStorage.getItem(LocalStorage.CONFIGURATOR)
    const localConfiguratorComponents: ConfiguratorComponentMap =
      localConfigurator ? JSON.parse(localConfigurator) : []
    const filledComponents: IConfiguratorComponentDto[] = typedEntries(
      localConfiguratorComponents
    )
      .filter((entry): entry is [ComponentTypes, string] => entry[1] !== null)
      .map(([key, value]) => ({ componentType: key, componentId: value }))

    dispatch(configuratorComponentsActions.setComponents(filledComponents))
    return
  }

  if (configuratorComponents) {
    dispatch(
      configuratorComponentsActions.setComponents(configuratorComponents)
    )
  }

  const localConfigurator = localStorage.getItem(LocalStorage.CONFIGURATOR)
  if (!localConfigurator) return

  const localConfiguratorComponents: ConfiguratorComponentMap =
    localConfigurator && JSON.parse(localConfigurator)
  const filledComponents = getConfiguratorComponentIds(
    localConfiguratorComponents
  )

  localStorage.removeItem(LocalStorage.CONFIGURATOR)

  if (filledComponents.length > 0) {
    console.log('будет диспатч')
    const added = await setConfigurator(filledComponents).unwrap()
    dispatch(configuratorComponentsActions.resetComponents())
    if (added) dispatch(configuratorComponentsActions.setComponents(added))
  }
}
