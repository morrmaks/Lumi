import { NextFunction, Request, Response } from "express";
import { bannerService } from "@/services/bannerService";

class BannerController {
  async getBanners(req: Request, res: Response, next: NextFunction) {
    try {
      const banners = await bannerService.getAll();
      return res.json(banners);
    } catch (e) {
      next(e);
    }
  }
}

const bannerController = new BannerController();

export { bannerController };
