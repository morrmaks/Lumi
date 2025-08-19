import express from "express";
import { basketController } from "@/controllers/basketController";

const router = express.Router();

router.get("/", basketController.getBasket);
router.delete("/", basketController.clearBasket);
router.post("/product", basketController.addProduct);
router.delete("/product/:productId", basketController.deleteProduct);
router.patch("/product/:productId/increase", basketController.increaseQuantity);
router.patch("/product/:productId/decrease", basketController.decreaseQuantity);
router.post("/products", basketController.addProducts);

export default router;
