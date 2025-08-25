import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { router } from "@/router";
import { errorMiddleware } from "@/middlewares/errorMiddleware";
import path from "path";
import { env } from "@/config/env";
const app = express();

app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    limit: 1000,
  }),
);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(
  "/static",
  express.static(path.join(process.cwd(), "static"), {
    setHeaders: (res) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
    },
  }),
);
app.use("/api", router);
app.use(errorMiddleware);

export default app;
