import { PaymentStatus } from "@/consts/order";

export interface IOrderProduct {
  productId: string;
  quantity: number;
}

export interface IOrderDto {
  id: string;
  total: number;
  status: string;
  date: string;
  products: IOrderProduct[];
  trackNumber: string;
  address: string;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
}

export interface IOrderProductDto {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categorySlug: string;
}
