import express from "express";
import { bannerController } from "@/controllers/bannerController";

const router = express.Router();

router.get("/", bannerController.getBanners);

export default router;
