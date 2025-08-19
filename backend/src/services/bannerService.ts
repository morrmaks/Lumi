import { BannerModel, IBanner } from "@/models/bannerModel";
import mongoose from "mongoose";
import { IProduct } from "@/models/productModel";

class BannerService {
  async getAll(): Promise<IBanner[]> {
    return BannerModel.find();
  }
}

const bannerService = new BannerService();

export { bannerService };
