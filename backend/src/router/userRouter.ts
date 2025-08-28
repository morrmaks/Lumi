import express from "express";
import { body } from "express-validator";
import { userController } from "@/controllers/userController";
import { avatarStorage } from "@/middlewares/uploadMiddleware";

const router = express.Router();

router.get("/me", userController.getMe);
router.get("/me/orders-count", userController.getOrdersCount);
router.patch(
  "/me/avatar",
  avatarStorage.single("avatar"),
  userController.updateAvatar,
);
router.patch(
  "/me",
  body("email").isEmail().withMessage("Введите корректный email"),
  body("phone")
    .custom((value, { req }) => {
      if (value === "") return true;

      return /^(\+7|8)\d{10}$/.test(value);
    })
    .withMessage("Введите корректный номер телефона"),
  userController.updateUser,
);
router.patch(
  "/me/password",
  body("newPassword")
    .isLength({ min: 6, max: 32 })
    .withMessage("Пароль должен быть от 6 до 32 символов"),

  userController.updatePassword,
);
router.patch("/me/settings", userController.updateSettings);
router.delete("/me", userController.deleteUser);

export default router;
