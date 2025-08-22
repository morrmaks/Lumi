import { IBanner } from "@/models/bannerModel";
import { IBannerDto } from "@/types/banner";

class BannerDto implements IBannerDto {
  id: string;
  title: string;
  description: string;
  image: string;
  route: string;

  constructor(model: IBanner) {
    this.id = String(model._id);
    this.title = model.title;
    this.description = model.description;
    this.image = model.image;
    this.route = model.route;
  }
}

export { BannerDto };
