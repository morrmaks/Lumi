import express from "express";
import { wishlistController } from "@/controllers/wishlistController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlist);
router.get("/products", wishlistController.getWishlistProducts);
router.delete("/", authMiddleware, wishlistController.clearWishlist);
router.post("/product", authMiddleware, wishlistController.addProduct);
router.delete(
  "/product/:productId",
  authMiddleware,
  wishlistController.deleteProduct,
);
router.post("/products", authMiddleware, wishlistController.addProducts);
router.delete("/products", authMiddleware, wishlistController.deleteProducts);

export default router;
