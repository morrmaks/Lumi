import { createConfiguratorComponentsMap } from './createConfiguratorComponentsMap'
import { EmptyConfigureComponentsMap } from '../consts'
import { IConfiguratorComponent } from '@/features/Configurator'

describe('createConfiguratorComponentsMap', () => {
  it('возвращает копию EmptyConfigureComponentsMap, если components undefined', () => {
    const result = createConfiguratorComponentsMap(undefined)
    expect(result).toEqual(EmptyConfigureComponentsMap)
    expect(result).not.toBe(EmptyConfigureComponentsMap)
  })

  it('возвращает копию EmptyConfigureComponentsMap, если components пустой массив', () => {
    const result = createConfiguratorComponentsMap([])
    expect(result).toEqual(EmptyConfigureComponentsMap)
    expect(result).not.toBe(EmptyConfigureComponentsMap)
  })

  it('заполняет карту компонентами по componentType', () => {
    const components: IConfiguratorComponent[] = [
      {
        componentType: 'processor',
        id: 'cpu1',
        discountPrice: 100,
        name: 'Intel',
        image: 'cpu.png',
      },
      {
        componentType: 'memory',
        id: 'ram1',
        discountPrice: 50,
        name: 'Corsair',
        image: 'ram.png',
      },
    ]
    const result = createConfiguratorComponentsMap(components)
    expect(result.processor).toEqual(components[0])
    expect(result.memory).toEqual(components[1])
  })

  it('сохраняет остальные значения из EmptyConfigureComponentsMap', () => {
    const components: IConfiguratorComponent[] = [
      {
        componentType: 'processor',
        id: 'cpu1',
        discountPrice: 100,
        name: 'Intel',
        image: 'cpu.png',
      },
    ]
    const result = createConfiguratorComponentsMap(components)
    expect(result['graphics-card']).toEqual(
      EmptyConfigureComponentsMap['graphics-card']
    )
  })
})
