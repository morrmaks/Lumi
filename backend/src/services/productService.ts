import { IProduct, ProductModel } from "@/models/productModel";
import mongoose from "mongoose";
import { ProductDto } from "@/dtos/productDto";
import { IProductDto } from "@/types/product";
import { ApiError } from "@/exeptions/apiError";

class ProductService {
  async getProduct(productId: string): Promise<IProductDto> {
    if (!mongoose.Types.ObjectId.isValid(productId))
      throw ApiError.BadRequest("Неверный id товара");

    const product = await ProductModel.findById(productId);
    if (!product) throw ApiError.NotFound("Товар не найден");

    return new ProductDto(product);
  }

  async getProducts(): Promise<IProduct[]> {
    const products = await ProductModel.find().exec();
    if (!products.length) throw ApiError.NotFound("Товары не найдены");
    return products;
  }
}

const productService = new ProductService();

export { productService };
