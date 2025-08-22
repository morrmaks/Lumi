import { env } from "@/config/env";
import mongoose from "mongoose";
import app from "./app";
import { Logger } from "@/lib/logger";

const logger = new Logger("MAIN");

const PORT = env.PORT;

const start = async () => {
  try {
    await mongoose.connect(env.DB_URL);
    app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
  } catch (e) {
    logger.error(`${e}`);
  }
};

start();
