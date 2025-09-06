import { test, expect } from '@playwright/test'

test.describe('Basket Page', () => {
  const url = '/basket'

  test('отображает пустую корзину', async ({ page }) => {
    await page.goto(url)

    const header = page.getByTestId('basket-header')
    await expect(header).toBeVisible()

    const emptyBasket = page.getByTestId('empty-basket')
    await expect(emptyBasket).toBeVisible()

    const button = emptyBasket.getByTestId('empty-basket-button')
    await expect(button).toBeVisible()
  })

  // test('отображает товары, если корзина не пуста', async ({ page }) => {
  //   await page.goto(url)
  //
  //   const basketProducts = page.getByTestId('basket-products')
  //   await expect(basketProducts).toBeVisible()
  // })
})
