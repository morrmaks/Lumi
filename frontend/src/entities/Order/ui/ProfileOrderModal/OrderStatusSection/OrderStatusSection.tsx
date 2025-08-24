import cls from './OrderStatusSection.module.less'
import { IconsMap, Placeholders } from '@/shared/consts'
import { OrderStatus, OrderStatusMap } from '@/entities/Order'
import { copyToClipboard, formattedDate } from '@/shared/lib/utils'
import { Icon } from '@/shared/ui/Icon'

interface OrderStatusSectionProps {
  trackNumber: string
  date: string
  status: OrderStatus
}

export const OrderStatusSection = ({
  trackNumber,
  date,
  status,
}: OrderStatusSectionProps) => {
  return (
    <div className={cls.orderStatusSection}>
      <div className={cls.orderStatusSection__status_container}>
        <span className={cls.orderStatusSection__status}>
          {OrderStatusMap[status]}
        </span>
        <span className={cls.orderStatusSection__date}>
          {`${Placeholders.entities.order.profileOrderModal.dateOrder} ${formattedDate(date)}`}
        </span>
      </div>
      <div className={cls.orderStatusSection__trackNumber_container}>
        <span className={cls.orderStatusSection__trackNumber_title}>
          {Placeholders.entities.order.profileOrderModal.trackNumber}
        </span>
        <div className={cls.orderStatusSection__trackNumber}>
          {trackNumber}
          <Icon
            Svg={IconsMap.COPY}
            className={cls.orderStatusSection__trackNumber_copyIcon}
            onClick={() => copyToClipboard(trackNumber)}
          />
        </div>
      </div>
    </div>
  )
}
