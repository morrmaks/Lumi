import { Request, Response, NextFunction } from "express";
import { Logger } from "@/lib/logger";
import { ApiError } from "@/exeptions/apiError";

const logger = new Logger("ERR_HANDLER");

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);
  if (err instanceof ApiError) {
    logger.error(`${err.message}`);
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  logger.error(`${err.message}`, {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
  });

  res.status(500).json({ message: "Непредвиденная ошибка" });
};

export { errorMiddleware };
