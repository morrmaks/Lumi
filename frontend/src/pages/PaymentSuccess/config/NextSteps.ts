interface INextStep {
  number: number
  title: string
  description: string
}

export const NextStepsConfig: INextStep[] = [
  {
    number: 1,
    title: 'Обработка',
    description: 'Проверяем наличие и готовим к отправке',
  },
  {
    number: 2,
    title: 'Упаковка',
    description: 'Аккуратно упаковываем товары',
  },
  {
    number: 3,
    title: 'Отправка',
    description: 'Передаем заказ курьерской службе',
  },
  {
    number: 4,
    title: 'Доставка',
    description: 'Получаете заказ по указанному адресу',
  },
]
