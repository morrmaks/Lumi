import { getConfiguratorProgress } from './getConfiguratorProgress'

describe('getConfiguratorProgress', () => {
  const fullComponents = {
    processor: 'CPU-1',
    'graphics-card': 'GPU-1',
    motherboard: null,
    memory: null,
    storage: null,
    'power-supplier': null,
    cooler: null,
    case: null,
  }

  it('возвращает корректный прогресс, если заполнено несколько компонентов', () => {
    const result = getConfiguratorProgress(fullComponents)
    expect(result).toEqual({
      total: 8,
      filled: 2,
      progress: (2 / 8) * 100,
    })
  })

  it('возвращает 0%, если ничего не заполнено', () => {
    const emptyComponents = {
      processor: null,
      'graphics-card': null,
      motherboard: null,
      memory: null,
      storage: null,
      'power-supplier': null,
      cooler: null,
      case: null,
    }
    const result = getConfiguratorProgress(emptyComponents)
    expect(result).toEqual({
      total: 8,
      filled: 0,
      progress: 0,
    })
  })

  it('возвращает 100%, если все заполнено', () => {
    const allFilled = {
      processor: 'CPU-1',
      'graphics-card': 'GPU-1',
      motherboard: 'MB-1',
      memory: 'RAM-1',
      storage: 'SSD-1',
      'power-supplier': 'PSU-1',
      cooler: 'Cooler-1',
      case: 'Case-1',
    }
    const result = getConfiguratorProgress(allFilled)
    expect(result).toEqual({
      total: 8,
      filled: 8,
      progress: 100,
    })
  })
})
