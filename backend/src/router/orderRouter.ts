import express from "express";
import { bannerController } from "@/controllers/bannerController";
import { orderController } from "@/controllers/orderController";

const router = express.Router();

router.get("/", orderController.getOrders);
router.post("/", orderController.createOrder);
router.get("/:orderId", orderController.getOrder);
router.get("/:orderId/products", orderController.getOrderProducts);
router.post("/:orderId/pay", orderController.payOrder);
router.get("/:orderId/payment/validate", orderController.paymentValidate);

export default router;
