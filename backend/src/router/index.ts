import express from "express";
import authRouter from "./authRouter";
import configuratorRouter from "@/router/configuratorRouter";
import { authMiddleware } from "@/middlewares/authMiddleware";
import basketRouter from "@/router/basketRouter";
import wishlistRouter from "@/router/wishlistRouter";
import userRouter from "@/router/userRouter";
import categoriesRouter from "@/router/categoriesRouter";
import productsRouter from "@/router/productsRouter";
import healthRouter from "@/router/healthRouter";
import bannerRouter from "@/router/bannerRouter";
import orderRouter from "@/router/orderRouter";

const router = express.Router();

router.use("/health", healthRouter);
router.use("/auth", authRouter);
router.use("/configurator", authMiddleware, configuratorRouter);
router.use("/basket", authMiddleware, basketRouter);
router.use("/wishlist", authMiddleware, wishlistRouter);
router.use("/user", authMiddleware, userRouter);
router.use("/categories", categoriesRouter);
router.use("/products", productsRouter);
router.use("/banners", bannerRouter);
router.use("/orders", orderRouter);

export { router };
