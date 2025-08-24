import { IOrderProductDto } from "@/types/order";
import { IProduct } from "@/models/productModel";

class OrderProductDto implements IOrderProductDto {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  categorySlug: string;

  constructor(model: IProduct, quantity: number, categorySlug: string) {
    this.id = String(model._id);
    this.name = model.name;
    this.price = model.price;
    this.image = model.images[0];
    this.quantity = quantity;
    this.categorySlug = categorySlug;
  }
}

export { OrderProductDto };
