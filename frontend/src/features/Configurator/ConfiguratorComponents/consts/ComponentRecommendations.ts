import { ComponentTypes } from './ComponentTypes'

export const ComponentRecommendations: Record<ComponentTypes, string> = {
  [ComponentTypes.CPU]:
    'Процессор: влияет на производительность и выбор платы.',
  [ComponentTypes.GPU]: 'Видеокарта: нужна для игр, графики и рендеринга.',
  [ComponentTypes.MB]:
    'Материнская плата: должна подходить к процессору и компонентам.',
  [ComponentTypes.RAM]:
    'Оперативная память: больше объём и скорость = быстрее работа.',
  [ComponentTypes.STORAGE]: 'Накопитель: SSD — скорость, HDD — объём.',
  [ComponentTypes.PSU]: 'Блок питания: обеспечивает стабильную работу системы.',
  [ComponentTypes.COOLER]: 'Охлаждение: защищает процессор от перегрева.',
  [ComponentTypes.CASE]: 'Корпус: вмещает комплектующие и охлаждает их.',
}
