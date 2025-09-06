import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector'
import { getBasketProducts } from '@/features/Basket'

export const useCheckInBasket = (id: string): boolean => {
  const basketProducts = useAppSelector(getBasketProducts)
  return basketProducts.some((product) => product.productId === id)
}
