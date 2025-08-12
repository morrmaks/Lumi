export const getProductDetailsDiscountAmount = (
  price: number,
  discountPrice: number
) => {
  return price - discountPrice
}
