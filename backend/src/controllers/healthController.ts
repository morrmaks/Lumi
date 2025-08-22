import { NextFunction, Request, Response } from "express";

class HealthController {
  checkHealth(req: Request, res: Response, next: NextFunction) {
    res.sendStatus(200);
  }
}

const healthController = new HealthController();
export { healthController };
