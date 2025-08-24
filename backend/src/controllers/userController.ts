import { userService } from "@/services/userService";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "@/exeptions/apiError";
import { formattedValidateErrors } from "@/utils/errors";

class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await userService.login(
        email,
        password,
      );
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ accessToken, user });
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Разлогинились успешно" });
    } catch (e) {
      next(e);
    }
  }

  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Ошибка при валидации",
            formattedValidateErrors(errors),
          ),
        );
      }

      const { name, email, password } = req.body;
      const { accessToken, refreshToken, user } =
        await userService.registration(name, email, password);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ accessToken, user });
    } catch (e) {
      next(e);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const userEmail = await userService.forgotPassword(email);
      return res.json(userEmail);
    } catch (e) {
      next(e);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Ошибка при валидации",
            formattedValidateErrors(errors),
          ),
        );
      }
      const { email, code, password } = req.body;
      const { accessToken, refreshToken, user } =
        await userService.resetPassword(email, code, password);
      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ accessToken, user });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const userData = await userService.getMe(userId);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getOrdersCount(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const ordersCount = await userService.getOrdersCount(userId);
      return res.json(ordersCount);
    } catch (e) {
      next(e);
    }
  }

  async updateAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      if (!file) {
        return next(ApiError.BadRequest("Файл не загружен"));
      }

      const { id: userId } = (req as any).user;
      const avatarUrl = await userService.updateAvatar(userId, file.filename);
      return res.json(avatarUrl);
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Ошибка при валидации",
            formattedValidateErrors(errors),
          ),
        );
      }

      const { id: userId } = (req as any).user;
      const { name, email, phone } = req.body;
      const userData = await userService.updateUser(userId, {
        name,
        email,
        phone,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest(
            "Ошибка при валидации",
            formattedValidateErrors(errors),
          ),
        );
      }

      const { id: userId } = (req as any).user;
      const { currentPassword, newPassword } = req.body;
      await userService.updatePassword(userId, currentPassword, newPassword);
      return res.json({ message: "Пароль успешно изменен" });
    } catch (e) {
      next(e);
    }
  }

  async updateSettings(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = (req as any).user;
      const { ...settings } = req.body;
      const userSettings = await userService.updateSettings(userId, settings);
      return res.json(userSettings);
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const { id: userId } = (req as any).user;
      await userService.deleteUser(userId, refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ message: "Аккаунт успешно удален" });
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

export { userController };
