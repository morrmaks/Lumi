import { IProduct, ProductModel } from "@/models/productModel";
import mongoose from "mongoose";
import { ProductDto } from "@/dtos/productDto";
import { IProductDto } from "@/types/product";

class ProductService {
  async getProduct(productId: string): Promise<IProductDto> {
    if (!mongoose.Types.ObjectId.isValid(productId))
      throw new Error("Неверный id товара");
    const product = await ProductModel.findById(productId);

    if (!product) throw new Error("Товар не найден");

    return new ProductDto(product);
  }

  async getProducts(): Promise<IProduct[]> {
    return await ProductModel.find().exec();
  }
}

const productService = new ProductService();

export { productService };
