import express from "express";
import { body } from "express-validator";
import { userController } from "@/controllers/userController";

const router = express.Router();

router.post("/logout", userController.logout);
router.post("/login", userController.login);
router.post(
  "/register",
  body("email").isEmail().withMessage("Введите корректный email"),
  body("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Пароль должен быть от 6 до 32 символов"),
  userController.registration,
);
router.post("/forgot-password", userController.forgotPassword);
router.post(
  "/reset-password",
  body("password")
    .isLength({ min: 6, max: 32 })
    .withMessage("Пароль должен быть от 6 до 32 символов"),
  userController.resetPassword,
);
router.post("/refresh", userController.refresh);

export default router;
