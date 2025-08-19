import { ComponentTypesKey } from '@/features/Configurator'

interface IProductSpec {
  label: string
  unit: string
}

export type ProductTypeSpecs = Record<string, IProductSpec>

export const ProductSpecsMap: Record<ComponentTypesKey, ProductTypeSpecs> = {
  CPU: {
    cores: { label: 'Количество ядер', unit: '' },
    threads: { label: 'Количество потоков', unit: '' },
    baseClock: { label: 'Базовая частота', unit: 'GHz' },
    boostClock: { label: 'Турбо частота', unit: 'GHz' },
    tdp: { label: 'TDP', unit: 'W' },
    socket: { label: 'Сокет', unit: '' },
  },
  GPU: {
    memory: { label: 'Объем памяти', unit: 'GB' },
    coreClock: { label: 'Частота ядра', unit: 'MHz' },
    boostClock: { label: 'Турбо частота', unit: 'MHz' },
    tdp: { label: 'TDP', unit: 'W' },
    interface: { label: 'Интерфейс', unit: '' },
  },
  MB: {
    chipset: { label: 'Чипсет', unit: '' },
    socket: { label: 'Сокет процессора', unit: '' },
    memorySlots: { label: 'Слоты памяти', unit: '' },
    maxMemory: { label: 'Максимальный объём памяти', unit: 'GB' },
    formFactor: { label: 'Форм-фактор', unit: '' },
  },
  RAM: {
    type: { label: 'Тип памяти', unit: '' },
    capacity: { label: 'Объём', unit: 'GB' },
    speed: { label: 'Частота', unit: 'MHz' },
    modules: { label: 'Количество модулей', unit: '' },
  },
  STORAGE: {
    type: { label: 'Тип накопителя', unit: '' },
    capacity: { label: 'Объём', unit: 'GB' },
    interface: { label: 'Интерфейс', unit: '' },
    readSpeed: { label: 'Скорость чтения', unit: 'MB/s' },
    writeSpeed: { label: 'Скорость записи', unit: 'MB/s' },
  },
  PSU: {
    power: { label: 'Мощность', unit: 'W' },
    efficiency: { label: 'Класс энергоэффективности', unit: '' },
    modular: { label: 'Модульность', unit: '' },
  },
  COOLER: {
    type: { label: 'Тип охлаждения', unit: '' },
    fanRPM: { label: 'Скорость вентилятора', unit: 'RPM' },
    tdpSupport: { label: 'Поддержка TDP', unit: 'W' },
  },
  CASE: {
    formFactor: { label: 'Форм-фактор корпуса', unit: '' },
    maxGPU: { label: 'Максимальная длина GPU', unit: 'mm' },
    maxCoolerHeight: { label: 'Максимальная высота кулера', unit: 'mm' },
    bays: { label: 'Количество отсеков', unit: '' },
  },
} as const
