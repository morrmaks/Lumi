import { getConfiguratorComponentIds } from './getConfiguratorComponentIds'
import { ConfiguratorComponentMap } from '@/features/Configurator'

describe('getConfiguratorComponentIds', () => {
  const fullEmptyMap: ConfiguratorComponentMap = {
    processor: null,
    'graphics-card': null,
    motherboard: null,
    memory: null,
    storage: null,
    cooler: null,
    'power-supplier': null,
    case: null,
  }

  it('возвращает пустой массив, если все значения null', () => {
    expect(getConfiguratorComponentIds(fullEmptyMap)).toEqual([])
  })

  it('фильтрует null и возвращает только строки', () => {
    const components: ConfiguratorComponentMap = {
      processor: 'cpu-id',
      'graphics-card': null,
      motherboard: 'mb-id',
      memory: null,
      storage: 'storage-id',
      cooler: null,
      'power-supplier': null,
      case: null,
    }
    expect(getConfiguratorComponentIds(components)).toEqual([
      'cpu-id',
      'mb-id',
      'storage-id',
    ])
  })

  it('возвращает все значения, если нет null', () => {
    const components: ConfiguratorComponentMap = {
      processor: 'cpu-id',
      'graphics-card': 'gpu-id',
      motherboard: 'mb-id',
      memory: 'ram-id',
      storage: 'storage-id',
      cooler: 'cooler-id',
      'power-supplier': 'psu-id',
      case: 'case-id',
    }
    expect(getConfiguratorComponentIds(components)).toEqual([
      'cpu-id',
      'gpu-id',
      'mb-id',
      'ram-id',
      'storage-id',
      'cooler-id',
      'psu-id',
      'case-id',
    ])
  })
})
