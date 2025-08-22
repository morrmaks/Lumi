import { rtkApi } from '@/shared/api'
import { ApiMap } from '@/shared/consts'
import {
  IConfiguratorComponent,
  IConfiguratorComponentDto,
} from '@/features/Configurator'

export const categoriesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getConfigure: build.query<IConfiguratorComponentDto[], void>({
      query: () => ({
        url: ApiMap.GET_CONFIGURE,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    getConfigureComponents: build.query<IConfiguratorComponent[], string[]>({
      query: (componentIds: string[]) => ({
        url: `${ApiMap.GET_CONFIGURE_COMPONENTS}?ids=${componentIds.join(',')}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 0,
    }),
    addConfigureComponent: build.mutation<IConfiguratorComponentDto, string>({
      query: (componentId) => ({
        url: ApiMap.ADD_COMPONENT,
        method: 'POST',
        body: { componentId },
      }),
    }),
    addConfigureComponents: build.mutation<
      IConfiguratorComponentDto[],
      string[]
    >({
      query: (componentIds) => ({
        url: ApiMap.ADD_COMPONENTS,
        method: 'POST',
        body: { componentIds },
      }),
    }),
    setConfigure: build.mutation<IConfiguratorComponentDto[], string[]>({
      query: (componentIds) => ({
        url: ApiMap.SET_CONFIGURE,
        method: 'POST',
        body: { componentIds },
      }),
    }),
    deleteConfigureComponent: build.mutation<IConfiguratorComponentDto, string>(
      {
        query: (componentId) => ({
          url: `${ApiMap.DELETE_COMPONENT}/${componentId}`,
          method: 'DELETE',
        }),
      }
    ),
    clearConfigure: build.mutation<void, void>({
      query: () => ({
        url: ApiMap.CLEAR_CONFIGURE,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetConfigureQuery,
  useGetConfigureComponentsQuery,
  useAddConfigureComponentMutation,
  useAddConfigureComponentsMutation,
  useSetConfigureMutation,
  useDeleteConfigureComponentMutation,
  useClearConfigureMutation,
} = categoriesApi
