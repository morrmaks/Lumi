import { fullSelectDiscountPrice } from './fullSelectDiscountPrice'
import { IWishlistProduct } from '@/features/Wishlist'

describe('fullSelectDiscountPrice', () => {
  const products = [
    { id: '1', discountPrice: 100 },
    { id: '2', discountPrice: 200 },
    { id: '3', discountPrice: 300 },
  ] as IWishlistProduct[]

  it('считает сумму выбранных продуктов', () => {
    const selected = ['1', '3']
    const result = fullSelectDiscountPrice(products, selected)
    expect(result).toBe(400)
  })

  it('возвращает 0, если ничего не выбрано', () => {
    const selected: string[] = []
    const result = fullSelectDiscountPrice(products, selected)
    expect(result).toBe(0)
  })

  it('игнорирует продукты, которых нет в select', () => {
    const selected = ['4', '5']
    const result = fullSelectDiscountPrice(products, selected)
    expect(result).toBe(0)
  })

  it('считает сумму, если все продукты выбраны', () => {
    const selected = ['1', '2', '3']
    const result = fullSelectDiscountPrice(products, selected)
    expect(result).toBe(600)
  })
})
