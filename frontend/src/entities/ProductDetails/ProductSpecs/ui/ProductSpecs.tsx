import cls from './ProductSpecs.module.less'
import { Placeholders } from '@/shared/consts'
import { ISpecs } from '@/features/Product/model/types/IProduct'
import { ProductSpecsMap } from '@/entities/ProductDetails'
import { ComponentTypes, ComponentTypeToKeyMap } from '@/features/Configurator'

export interface ProductSpecsProps<C extends ComponentTypes> {
  specs: ISpecs<C>
  componentType: C
}

export const ProductSpecs = <C extends ComponentTypes>({
  specs,
  componentType,
}: ProductSpecsProps<C>) => {
  const specsMap = ProductSpecsMap[ComponentTypeToKeyMap[componentType]]

  return (
    <div className={cls.productSpecs}>
      <h3 className={cls.productSpecs__title}>
        {Placeholders.entities.productDetails.specs.mainText}
      </h3>
      <ul className={cls.productSpecs__list}>
        {Object.entries(specs).map(([key, value]) => {
          const meta = specsMap[key as keyof typeof specsMap]
          if (!meta) return null

          return (
            <li key={key} className={cls.productSpecs__spec}>
              <span className={cls.productSpecs__spec_label}>{meta.label}</span>
              <div className={cls.productSpecs__spec_line}></div>
              <span
                className={cls.productSpecs__spec_value}
              >{`${value} ${meta.unit}`}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
