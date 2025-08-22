import { LocalStorage } from '@/shared/consts'
import { basketProductsActions } from '@/features/Basket'
import { useAppDispatch } from '@/shared/lib/hooks'
import { IBasketItem } from '@/features/Basket'

export const initBasket = async (
  isAuth: boolean,
  basketProductItems: IBasketItem[] | undefined,
  addManyToBasket: (productIds: IBasketItem[]) => {
    unwrap: () => Promise<IBasketItem[]>
  },
  dispatch: ReturnType<typeof useAppDispatch>
) => {
  if (!isAuth) {
    const localBasket = localStorage.getItem(LocalStorage.BASKET)
    dispatch(
      basketProductsActions.setProducts(
        localBasket ? JSON.parse(localBasket) : []
      )
    )
    return
  }

  const localBasket = localStorage.getItem(LocalStorage.BASKET)
  const localBasketItems: IBasketItem[] = localBasket
    ? JSON.parse(localBasket)
    : []
  localStorage.removeItem(LocalStorage.BASKET)

  if (basketProductItems)
    dispatch(basketProductsActions.setProducts(basketProductItems))

  if (localBasketItems.length > 0) {
    const added = await addManyToBasket(localBasketItems).unwrap()
    if (added) dispatch(basketProductsActions.setSomeProducts(added))
  }
}
