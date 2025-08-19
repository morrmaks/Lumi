import express from "express";
import { wishlistController } from "@/controllers/wishlistController";

const router = express.Router();

router.get("/", wishlistController.getWishlist);
router.delete("/", wishlistController.clearWishlist);
router.post("/product", wishlistController.addProduct);
router.delete("/product/:productId", wishlistController.deleteProduct);
router.post("/products", wishlistController.addProducts);
router.delete("/products", wishlistController.deleteProducts);

export default router;
