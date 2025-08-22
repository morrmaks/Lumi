import express from "express";
import { configuratorController } from "@/controllers/configuratorController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, configuratorController.getConfigure);
router.post("/", authMiddleware, configuratorController.setConfigure);
router.delete("/", authMiddleware, configuratorController.clearConfigure);
router.post("/component", authMiddleware, configuratorController.addComponent);
router.delete(
  "/component/:componentId",
  authMiddleware,
  configuratorController.deleteComponent,
);
router.post(
  "/components",
  authMiddleware,
  configuratorController.addComponents,
);
router.get("/components", configuratorController.getConfigureComponents);

export default router;
