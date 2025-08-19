import { NextFunction, Request, Response } from "express";
import { configuratorService } from "@/services/configuratorService";

class ConfiguratorController {
  async getConfigure(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;

      const data = await configuratorService.getConfigure(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addComponent(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { componentId } = req.body;

      const data = await configuratorService.addComponent(userId, componentId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async addComponents(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { componentIds } = req.body;

      const data = await configuratorService.addComponents(
        userId,
        componentIds,
      );

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async deleteComponent(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;
      const { componentId } = req.params;

      const data = await configuratorService.deleteComponent(
        userId,
        componentId,
      );

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async clearConfigure(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = (req as any).user;

      const data = await configuratorService.clearConfigure(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const configuratorController = new ConfiguratorController();

export { configuratorController };
