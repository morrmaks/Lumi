import {
  type ConfiguratorComponentConfig,
  configuratorComponentsConfig,
} from './config/configuratorComponentsConfig'
import { ComponentNames } from './consts/componentNames'
import { getConfiguratorComponentsState } from './model/selectors/getConfiguratorComponentsState'
import {
  configuratorComponentsReducer,
  configuratorComponentsActions,
} from './model/slice/configuratorComponentsSlice'
import type {
  ConfiguratorComponent,
  ConfiguratorComponentIdsMap,
  ConfiguratorComponentMap,
  ConfiguratorComponentsSchema,
} from './model/types/configuratorComponentsSchema'
import { ConfiguratorComponents } from './ui/ConfiguratorComponents'

export {
  ConfiguratorComponent,
  ConfiguratorComponentIdsMap,
  ConfiguratorComponentMap,
  ConfiguratorComponentConfig,
  configuratorComponentsConfig,
  ComponentNames,
  getConfiguratorComponentsState,
  configuratorComponentsReducer,
  configuratorComponentsActions,
  ConfiguratorComponentsSchema,
  ConfiguratorComponents,
}
