import { getArrayRecommendations } from './getArrayRecommentations'
import {
  ComponentRecommendations,
  ConfiguratorComponentMap,
} from '@/features/Configurator'

describe('getArrayRecommendations', () => {
  const components = {
    processor: 'CPU-1',
    'graphics-card': null,
    motherboard: 'MB-1',
    memory: null,
    storage: 'SSD-1',
    'power-supplier': null,
    cooler: 'Cooler-1',
  } as unknown as ConfiguratorComponentMap

  it('возвращает рекомендации для незаполненных компонентов', () => {
    const result = getArrayRecommendations(components)
    const expected = ['graphics-card', 'memory', 'power-supplier'].map(
      (key) =>
        ComponentRecommendations[key as keyof typeof ComponentRecommendations]
    )
    expect(result).toEqual(expected)
  })

  it('возвращает пустой массив, если все компоненты заполнены', () => {
    const allFilled = Object.fromEntries(
      Object.keys(components).map((key) => [key, 'filled'])
    ) as ConfiguratorComponentMap
    const result = getArrayRecommendations(allFilled)
    expect(result).toEqual([])
  })

  it('возвращает все рекомендации, если все компоненты пустые', () => {
    const allEmpty = Object.fromEntries(
      Object.keys(components).map((key) => [key, null])
    ) as ConfiguratorComponentMap
    const result = getArrayRecommendations(allEmpty)
    const expected = Object.keys(allEmpty).map(
      (key) =>
        ComponentRecommendations[key as keyof typeof ComponentRecommendations]
    )
    expect(result).toEqual(expected)
  })
})
