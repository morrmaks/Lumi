import { IBasketItem } from '@/features/Basket'
import { totalBasketProducts } from './totalBasketProducts'

describe('totalBasketProducts', () => {
  it('возвращает 0 для пустого массива', () => {
    expect(totalBasketProducts([])).toBe(0)
  })

  it('считает сумму quantity для нескольких товаров', () => {
    const products: IBasketItem[] = [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 3 },
      { productId: '3', quantity: 1 },
    ]
    expect(totalBasketProducts(products)).toBe(6)
  })

  it('работает с одним товаром', () => {
    const products: IBasketItem[] = [{ productId: '1', quantity: 5 }]
    expect(totalBasketProducts(products)).toBe(5)
  })
})
