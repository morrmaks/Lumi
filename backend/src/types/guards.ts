import { ProductWithComponentType } from "@/types/product";

export function isProductWithComponentType(
  product: any,
): product is ProductWithComponentType {
  return "componentType" in product;
}
