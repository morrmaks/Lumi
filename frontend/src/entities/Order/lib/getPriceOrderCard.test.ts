import { getPriceOrderCard } from './getPriceOrderCard'

describe('getPriceOrderCard', () => {
  it('должен корректно умножать количество на цену', () => {
    expect(getPriceOrderCard(2, 500)).toBe(1000)
    expect(getPriceOrderCard(3, 150)).toBe(450)
  })

  it('должен вернуть 0, если количество равно 0', () => {
    expect(getPriceOrderCard(0, 1000)).toBe(0)
  })

  it('должен вернуть 0, если цена равна 0', () => {
    expect(getPriceOrderCard(5, 0)).toBe(0)
  })

  it('должен работать с большими числами', () => {
    expect(getPriceOrderCard(1_000_000, 2)).toBe(2_000_000)
  })
})
