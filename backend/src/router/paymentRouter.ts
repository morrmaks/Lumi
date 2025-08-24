import express from "express";
import { orderController } from "@/controllers/orderController";
import { paymentController } from "@/controllers/paymentController";

const router = express.Router();

router.post("/", paymentController.createPayment);
router.post("/webhook", paymentController.paymentWebhook);

export default router;
