import { getBasketDiscountAmount } from './getBasketDiscountAmount'

describe('getBasketDiscountAmount', () => {
  it('возвращает 0 если скидки нет', () => {
    expect(getBasketDiscountAmount(1000, 1000)).toBe(0)
  })

  it('правильно считает разницу когда есть скидка', () => {
    expect(getBasketDiscountAmount(1000, 800)).toBe(200)
  })

  it('возвращает отрицательное значение если discountPrice больше fullPrice', () => {
    expect(getBasketDiscountAmount(1000, 1200)).toBe(-200)
  })

  it('работает с нулями', () => {
    expect(getBasketDiscountAmount(0, 0)).toBe(0)
  })
})
