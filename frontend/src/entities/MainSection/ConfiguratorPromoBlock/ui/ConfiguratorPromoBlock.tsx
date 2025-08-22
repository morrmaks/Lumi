import { AppImage } from '@/shared/ui/AppImage'
import cls from './ConfiguratorPromoBlock.module.less'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteConfigurator, Placeholders } from '@/shared/consts'

export const ConfiguratorPromoBlock = () => {
  return (
    <AppLink className={cls.configuratorPromoBlock} to={getRouteConfigurator()}>
      <div className={cls.configuratorPromoBlock__shadow} />
      <div className={cls.configuratorPromoBlock__details}>
        <h3 className={cls.configuratorPromoBlock__title}>
          {Placeholders.entities.mainSection.configuratorPromoBlock.mainText}
        </h3>
        <p className={cls.configuratorPromoBlock__description}>
          {
            Placeholders.entities.mainSection.configuratorPromoBlock
              .describeText
          }
        </p>
      </div>
      <AppImage
        className={cls.configuratorPromoBlock__image}
        src={
          'https://images.unsplash.com/photo-1573053986275-840ffc7cc685?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        }
        alt={'Конфигурация ПК'}
      />
    </AppLink>
  )
}
