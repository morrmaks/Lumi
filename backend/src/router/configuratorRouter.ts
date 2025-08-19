import express from "express";
import { configuratorController } from "@/controllers/configuratorController";

const router = express.Router();

router.get("/", configuratorController.getConfigure);
router.delete("/", configuratorController.clearConfigure);
router.post("/component", configuratorController.addComponent);
router.delete(
  "/component/:componentId",
  configuratorController.deleteComponent,
);
router.post("/components", configuratorController.addComponents);

export default router;
