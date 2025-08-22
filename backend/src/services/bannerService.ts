import { BannerModel } from "@/models/bannerModel";
import { BannerDto } from "@/dtos/bannerDto";
import { IBannerDto } from "@/types/banner";

class BannerService {
  async getAll(): Promise<IBannerDto[]> {
    const banners = await BannerModel.find();
    return banners.map((banner) => new BannerDto(banner));
  }
}

const bannerService = new BannerService();

export { bannerService };
