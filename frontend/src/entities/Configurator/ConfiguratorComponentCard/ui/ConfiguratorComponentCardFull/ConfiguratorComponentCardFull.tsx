import cls from './ConfiguratorComponentCardFull.module.less'
import {
  ComponentTypes,
  IConfiguratorComponent,
  ConfiguratorComponentsConfig,
  configuratorComponentsActions,
} from '@/features/Configurator'
import { Icon } from '@/shared/ui/Icon'
import { IconsMap } from '@/shared/consts/icons'
import { AppImage } from '@/shared/ui/AppImage'
import { useCallback } from 'react'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { getUserIsAuth } from '@/entities/User'
import {
  useAppDispatch,
  useAppSelector,
  useBreakpoint,
} from '@/shared/lib/hooks'
import { useDeleteConfigureComponentMutation } from '@/features/Configurator/api'
import { AppLink } from '@/shared/ui/AppLink'

interface ConfiguratorComponentCardFullProps {
  componentName: ComponentTypes
  component: IConfiguratorComponent
  routeItem: string
  routeCategory: string
}

export const ConfiguratorComponentCardFull = ({
  componentName,
  component,
  routeItem,
  routeCategory,
}: ConfiguratorComponentCardFullProps) => {
  const { id, name, discountPrice, image, componentType } = component
  const { sm } = useBreakpoint()
  const isAuth = useAppSelector(getUserIsAuth)
  const dispatch = useAppDispatch()
  const [
    deleteFromConfigurator,
    { isLoading: isLoadingDeleteFromConfigurator },
  ] = useDeleteConfigureComponentMutation()
  const handleDeleteFromConfigurator = useCallback(async () => {
    if (!componentType) return
    if (isAuth) await deleteFromConfigurator(id)
    dispatch(
      configuratorComponentsActions.removeComponent({
        componentType,
        componentId: id,
      })
    )
  }, [dispatch, isAuth, id, componentType])

  return (
    <div className={cls.configuratorComponentCardFull__container}>
      <div className={cls.configuratorComponentCardFull}>
        <AppLink
          to={routeItem}
          className={cls.configuratorComponentCardFull__itemLink}
        >
          <AppImage
            src={image}
            alt={name}
            className={cls.configuratorComponentCardFull__image}
          />
          <div className={cls.configuratorComponentCardFull__meta}>
            <h4 className={cls.configuratorComponentCardFull__title}>
              {ConfiguratorComponentsConfig[componentName].label}
            </h4>
            <p className={cls.configuratorComponentCardFull__productName}>
              {name}
            </p>
            {!sm && (
              <span className={cls.configuratorComponentCardFull__price}>
                {discountPrice} ₽
              </span>
            )}
          </div>
        </AppLink>
        <div className={cls.configuratorComponentCardFull__actions}>
          {sm && (
            <span className={cls.configuratorComponentCardFull__price}>
              {discountPrice} ₽
            </span>
          )}
          <div className={cls.configuratorComponentCardFull__buttons}>
            <Button
              theme={ButtonTheme.STATIC}
              square={true}
              onClick={handleDeleteFromConfigurator}
              disabled={isLoadingDeleteFromConfigurator}
              className={cls.configuratorComponentCardFull__deleteButton}
            >
              <Icon
                Svg={IconsMap.TRASH}
                className={cls.configuratorComponentCardFull__deleteIcon}
              />
            </Button>
            <AppLink
              to={routeCategory}
              className={cls.configuratorComponentCardFull__categoryLink}
            >
              <Icon
                Svg={IconsMap.CHANGE}
                className={cls.configuratorComponentCardFull__changeIcon}
              />
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  )
}
