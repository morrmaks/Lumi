import { ComponentType } from "@/types/product";

export interface IConfiguratorDto {
  componentId: string;
  componentType: ComponentType;
}

export interface IConfiguratorProductDto {
  id: string;
  image: string;
  name: string;
  discountPrice: number;
  componentType: ComponentType;
}
