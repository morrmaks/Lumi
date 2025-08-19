import express from "express";
import { categoryController } from "@/controllers/categoryController";

const router = express.Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.get("/:id/products", categoryController.getProducts);

export default router;
