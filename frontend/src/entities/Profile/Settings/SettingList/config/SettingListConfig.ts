import { Settings } from '@/entities/User'

export interface ISetting {
  title: string
  description: string
  name: keyof Settings
}

export const settingListConfig: ISetting[] = [
  {
    title: 'Уведомления о заказах',
    description: 'Получать уведомления о статусе заказов',
    name: 'orderNotifications',
  },
  {
    title: 'Маркетинговые уведомления',
    description: 'Получать информацию о скидках и акциях',
    name: 'marketingNotifications',
  },
  {
    title: 'Новостная рассылка',
    description: 'Получать новости о новинках и событиях',
    name: 'newsNotifications',
  },
]
