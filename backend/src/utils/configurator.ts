import { IProduct } from "@/models/productModel";

export const calculateConfiguratorPrice = (components: IProduct[]) => {
  return components.reduce(
    (sum: number, component: IProduct) => sum + component.discountPrice,
    0,
  );
};
