import express from "express";
import { bannerController } from "@/controllers/bannerController";
import { orderController } from "@/controllers/orderController";

const router = express.Router();

router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);

export default router;
