import { fullBasketPrices } from './fullBasketPrices'
import { IBasketItem, IBasketProduct } from '@/features/Basket'

const products: IBasketProduct[] = [
  {
    id: '1',
    name: 'CPU',
    categorySlug: 'processor',
    price: 300,
    discountPrice: 250,
    rating: 5,
    reviews: 10,
    image: 'cpu.png',
    quantity: 5,
  },
  {
    id: '2',
    name: 'GPU',
    categorySlug: 'gpu',
    price: 600,
    discountPrice: 500,
    rating: 4,
    reviews: 20,
    image: 'gpu.png',
    quantity: 3,
  },
]

describe('fullBasketPrices', () => {
  it('возвращает 0 если корзина пуста', () => {
    const basket: IBasketItem[] = []
    expect(fullBasketPrices(basket, products)).toEqual({
      discountPrice: 0,
      price: 0,
    })
  })

  it('считает корректно для одного товара', () => {
    const basket: IBasketItem[] = [{ productId: '1', quantity: 2 }]
    expect(fullBasketPrices(basket, products)).toEqual({
      discountPrice: 250 * 2,
      price: 300 * 2,
    })
  })

  it('считает корректно для нескольких товаров', () => {
    const basket: IBasketItem[] = [
      { productId: '1', quantity: 1 },
      { productId: '2', quantity: 2 },
    ]
    expect(fullBasketPrices(basket, products)).toEqual({
      discountPrice: 250 * 1 + 500 * 2,
      price: 300 * 1 + 600 * 2,
    })
  })

  it('игнорирует товары, которых нет в products', () => {
    const basket: IBasketItem[] = [
      { productId: '1', quantity: 1 },
      { productId: '999', quantity: 3 }, // нет такого продукта
    ]
    expect(fullBasketPrices(basket, products)).toEqual({
      discountPrice: 250,
      price: 300,
    })
  })

  it('работает с quantity = 0', () => {
    const basket: IBasketItem[] = [{ productId: '1', quantity: 0 }]
    expect(fullBasketPrices(basket, products)).toEqual({
      discountPrice: 0,
      price: 0,
    })
  })
})
