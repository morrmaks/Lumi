import { getTotalPriceCard } from './getTotalPriceCard'

describe('getTotalPriceCard', () => {
  it('должен корректно считать итоговую цену', () => {
    expect(getTotalPriceCard(2, 500)).toBe(1000)
    expect(getTotalPriceCard(3, 200)).toBe(600)
  })

  it('должен вернуть 0, если количество равно 0', () => {
    expect(getTotalPriceCard(0, 1000)).toBe(0)
  })

  it('должен вернуть 0, если цена равна 0', () => {
    expect(getTotalPriceCard(10, 0)).toBe(0)
  })

  it('должен работать с большими числами', () => {
    expect(getTotalPriceCard(1_000_000, 3)).toBe(3_000_000)
  })
})
