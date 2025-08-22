import { IProduct } from "@/models/productModel";

export type ComponentType =
  | "processor"
  | "graphics-card"
  | "motherboard"
  | "memory"
  | "storage"
  | "power-supplier"
  | "cooler"
  | "case";

export interface ProductWithComponentType extends IProduct {
  componentType: ComponentType;
}

export interface IProductDto {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  discountPrice: number;
  rating: number;
  reviews: number;
  images: string[];
  quantity?: number;
  specs?: Record<string, string | number>;
  componentType?: ComponentType;
}
