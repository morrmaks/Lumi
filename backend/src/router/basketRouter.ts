import express from "express";
import { basketController } from "@/controllers/basketController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, basketController.getBasket);
router.get("/products", basketController.getBasketProducts);
router.delete("/", authMiddleware, basketController.clearBasket);
router.post("/product", authMiddleware, basketController.addProduct);
router.post("/products", authMiddleware, basketController.addProducts);
router.delete(
  "/product/:productId",
  authMiddleware,
  basketController.deleteProduct,
);
router.patch(
  "/product/:productId/increase",
  authMiddleware,
  basketController.increaseQuantity,
);
router.patch(
  "/product/:productId/decrease",
  authMiddleware,
  basketController.decreaseQuantity,
);

export default router;
