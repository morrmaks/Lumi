import { IconsMapKeys } from '@/shared/consts'

interface InfoCards {
  icon: IconsMapKeys
  name: string
  title: string
  description: string
}

export const InfoCardsConfig: InfoCards[] = [
  {
    icon: 'EMAIL',
    name: 'email',
    title: 'Подтверждение отправлено',
    description: 'Детали заказа отправлены на вашу электронную почту',
  },
  {
    icon: 'HOURS',
    name: 'delivery',
    title: 'Время доставки',
    description: 'Ожидайте доставку в течение 1-3 рабочих дней',
  },
  {
    icon: 'NOTICE',
    name: 'notice',
    title: 'Отслеживание',
    description: 'Получите уведомления о статусе заказа',
  },
]
