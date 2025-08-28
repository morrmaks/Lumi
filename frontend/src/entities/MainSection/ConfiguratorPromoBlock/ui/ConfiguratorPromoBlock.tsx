import { AppImage } from '@/shared/ui/AppImage'
import cls from './ConfiguratorPromoBlock.module.less'
import { AppLink } from '@/shared/ui/AppLink'
import { getRouteConfigurator, Placeholders } from '@/shared/consts'

export const ConfiguratorPromoBlock = () => {
  return (
    <AppLink className={cls.configuratorPromoBlock} to={getRouteConfigurator()}>
      {/*<div className={cls.configuratorPromoBlock__shadow} />*/}
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
          'https://8903474f-f4365eeb-d3f3-43b8-b5d3-a6281d72da08.s3.twcstorage.ru/banners/configurator-promo-block.avif'
        }
        alt={'Конфигурация ПК'}
      />
    </AppLink>
  )
}
