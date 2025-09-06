import { getProductDetailsDiscountAmount } from './getProductDetailsDiscountAmount'

describe('getProductDetailsDiscountAmount', () => {
  it('должен вернуть разницу между price и discountPrice', () => {
    expect(getProductDetailsDiscountAmount(1000, 800)).toBe(200)
  })

  it('должен вернуть 0, если цены одинаковые', () => {
    expect(getProductDetailsDiscountAmount(500, 500)).toBe(0)
  })

  it('должен вернуть отрицательное значение, если discountPrice больше', () => {
    expect(getProductDetailsDiscountAmount(700, 900)).toBe(-200)
  })
})
