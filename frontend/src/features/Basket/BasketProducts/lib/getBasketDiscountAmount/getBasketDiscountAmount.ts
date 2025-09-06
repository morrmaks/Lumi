export const getBasketDiscountAmount = (
  fullPrice: number,
  discountPrice: number
) => {
  return fullPrice - discountPrice
}
