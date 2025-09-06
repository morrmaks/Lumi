import { getTotalConfigPrice } from './getTotalConfigPrice'
import { IConfiguratorComponent } from '@/features/Configurator'

describe('getTotalConfigPrice', () => {
  it('возвращает 0, если components = undefined', () => {
    expect(getTotalConfigPrice(undefined)).toBe(0)
  })

  it('возвращает 0, если список пустой', () => {
    expect(getTotalConfigPrice([])).toBe(0)
  })

  it('игнорирует null значения', () => {
    const components = [null, null] as unknown as IConfiguratorComponent[]
    expect(getTotalConfigPrice(components)).toBe(0)
  })

  it('считает сумму discountPrice', () => {
    const components = [
      { discountPrice: 1000 },
      { discountPrice: 2000 },
      { discountPrice: 3000 },
    ] as IConfiguratorComponent[]

    expect(getTotalConfigPrice(components)).toBe(6000)
  })

  it('использует 0, если discountPrice отсутствует', () => {
    const components = [
      { discountPrice: 1000 },
      {} as IConfiguratorComponent,
    ] as IConfiguratorComponent[]

    expect(getTotalConfigPrice(components)).toBe(1000)
  })

  it('корректно работает со смешанными значениями', () => {
    const components = [
      { discountPrice: 1500 },
      null,
      {} as IConfiguratorComponent,
      { discountPrice: 2500 },
    ] as unknown as IConfiguratorComponent[]

    expect(getTotalConfigPrice(components)).toBe(4000)
  })
})
