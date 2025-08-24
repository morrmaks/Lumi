import cls from './OrderProducts.module.less'
import { Placeholders } from '@/shared/consts'
import { ProductOrderCard, ProductOrderCardSkeleton } from '@/entities/Order'
import { IOrderProduct, IOrderProductFull } from '@/features/Order'

interface OrderProductsProps {
  productList: IOrderProductFull[] | undefined
  isLoading: boolean
  products: IOrderProduct[]
}

export const OrderProducts = ({
  productList,
  isLoading,
  products,
}: OrderProductsProps) => {
  return (
    <div className={cls.orderProducts}>
      <h4 className={cls.orderProducts__title}>
        {!productList && !isLoading
          ? Placeholders.entities.order.profileOrderModal.products.notFoundText
          : Placeholders.entities.order.profileOrderModal.products.mainText}
      </h4>
      <ul className={cls.orderProducts__list}>
        {isLoading
          ? [...new Array(products.length)].map((_, index) => (
              <li className={cls.orderProducts__list_product} key={index}>
                <ProductOrderCardSkeleton />
              </li>
            ))
          : productList?.map((card) => (
              <li className={cls.orderProducts__list_product} key={card.id}>
                <ProductOrderCard card={card} />
              </li>
            ))}
      </ul>
    </div>
  )
}
