import { NextFunction, Request, Response } from "express";
import { configuratorService } from "@/services/configuratorService";

class ConfiguratorController {
  async getConfigure(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;

      const components = await configuratorService.getConfigure(userId);

      return res.json(components);
    } catch (e) {
      next(e);
    }
  }

  async setConfigure(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { componentIds } = req.body;

      const components = await configuratorService.setConfigure(
        userId,
        componentIds,
      );

      return res.json(components);
    } catch (e) {
      next(e);
    }
  }

  async getConfigureComponents(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const componentIds = (req.query.ids as string).split(",");

      const products =
        await configuratorService.getConfigureComponents(componentIds);

      return res.json(products);
    } catch (e) {
      next(e);
    }
  }

  async addComponent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { componentId } = req.body;

      const component = await configuratorService.addComponent(
        userId,
        componentId,
      );

      return res.json(component);
    } catch (e) {
      next(e);
    }
  }

  async addComponents(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { componentIds } = req.body;

      const components = await configuratorService.addComponents(
        userId,
        componentIds,
      );

      return res.json(components);
    } catch (e) {
      next(e);
    }
  }

  async deleteComponent(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { componentId } = req.params;

      const deletedComponentId = await configuratorService.deleteComponent(
        userId,
        componentId,
      );

      return res.json(deletedComponentId);
    } catch (e) {
      next(e);
    }
  }

  async clearConfigure(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;

      const data = await configuratorService.clearConfigure(userId);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const configuratorController = new ConfiguratorController();

export { configuratorController };
