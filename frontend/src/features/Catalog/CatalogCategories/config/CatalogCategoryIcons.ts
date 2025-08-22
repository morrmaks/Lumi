import { CatalogCategoriesMap } from '@/shared/consts/catalogCategoriesMap'
import { IconsMap } from '@/shared/consts/icons'

interface CatalogCategory {
  label: string
  description: string
  icon: keyof typeof IconsMap
  route: CatalogCategoriesMap
}

export const CatalogCategoryIcons: Record<
  CatalogCategoriesMap,
  keyof typeof IconsMap
> = {
  [CatalogCategoriesMap.CPU]: 'CPU',
  [CatalogCategoriesMap.GPU]: 'GPU',
  [CatalogCategoriesMap.MB]: 'MOTHERBOARD',
  [CatalogCategoriesMap.RAM]: 'RAM',
  [CatalogCategoriesMap.STORAGE]: 'STORAGE',
  [CatalogCategoriesMap.PSU]: 'PSU',
  [CatalogCategoriesMap.CASE]: 'CASE',
  [CatalogCategoriesMap.COOLER]: 'COOLER',
}

//   [
//   {
//     label: 'Процессоры',
//     description: 'CPU для игр, работы и профессиональных задач',
//     icon: 'CPU',
//     route: CatalogCategoriesMap.CPU,
//   },
//   {
//     label: 'Видеокарты',
//     description: 'GPU для игр, майнинга и профессиональной графики',
//     icon: 'GPU',
//     route: CatalogCategoriesMap.GPU,
//   },
//   {
//     label: 'Материнские платы',
//     description: 'Основа для сборки компьютера',
//     icon: 'MOTHERBOARD',
//     route: CatalogCategoriesMap.MB,
//   },
//   {
//     label: 'Оперативная память',
//     description: 'DDR4 и DDR5 модули различных объемов',
//     icon: 'RAM',
//     route: CatalogCategoriesMap.RAM,
//   },
//   {
//     label: 'Накопители SSD',
//     description: 'SSD и HDD для хранения данных',
//     icon: 'STORAGE',
//     route: CatalogCategoriesMap.STORAGE,
//   },
//   {
//     label: 'Блоки питания',
//     description: 'Надежные PSU с различной мощностью',
//     icon: 'PSU',
//     route: CatalogCategoriesMap.PSU,
//   },
//   {
//     label: 'Охлаждение',
//     description: 'Системы охлаждения для процессоров и корпусов',
//     icon: 'COOLER',
//     route: CatalogCategoriesMap.COOLER,
//   },
//   {
//     label: 'Корпусы',
//     description: 'Корпуса различных размеров и дизайнов',
//     icon: 'CASE',
//     route: CatalogCategoriesMap.CASE,
//   },
// ]
