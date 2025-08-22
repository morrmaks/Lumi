import { mailService } from "@/services/mailService";
import { IUserSettings, UserModel } from "@/models/userModel";
import { ApiError } from "@/exeptions/apiError";
import bcrypt from "bcrypt";
import { UserDto } from "@/dtos/userDto";
import { tokenService } from "@/services/tokenService";
import path from "path";
import * as fs from "node:fs";
import { DeleteResult } from "mongodb";

class UserService {
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    if (!email || !password)
      throw ApiError.BadRequest("Email и пароль обязательны");

    const user = await UserModel.findOne({ email });
    if (!user)
      throw ApiError.BadRequest("Пользователь с таким email не найден");

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Неверный пароль");

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string): Promise<DeleteResult> {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async registration(
    name: string,
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    if (!name || !email || !password)
      throw ApiError.BadRequest("Имя, email и пароль обязательны");

    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);

    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async forgotPassword(email: string): Promise<string> {
    if (!email) throw ApiError.BadRequest("Email обязателен");

    const user = await UserModel.findOne({ email });
    if (!user)
      throw ApiError.BadRequest("Пользователь с таким email не найден");

    const code = await mailService.generateUniqueCode();
    user.resetPasswordCode = code;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    await mailService.sendVerificationCode(email, code);

    return email;
  }

  async resetPassword(
    email: string,
    code: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    if (!email || !code || !password)
      throw ApiError.BadRequest("Все поля обязательны");

    const user = await UserModel.findOne({
      email,
      resetPasswordCode: code,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      throw ApiError.BadRequest("Неверный код или срок действия истек");
    }

    const hashPassword = await bcrypt.hash(password, 3);
    user.password = hashPassword;
    user.resetPasswordCode = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    if (!refreshToken) throw ApiError.Unauthorized();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw ApiError.Unauthorized();

    const user = await UserModel.findById(userData.id);

    if (!user) throw ApiError.Unauthorized();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getMe(userId: string): Promise<UserDto> {
    if (!userId) throw ApiError.Unauthorized();

    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.NotFound("Пользователь не найден");

    const userDto = new UserDto(user);
    return userDto;
  }

  async updateAvatar(userId: string, filename: string): Promise<string> {
    if (!userId || !filename)
      throw ApiError.BadRequest("Пользователь и файл обязательны");

    const user = await UserModel.findById(userId);
    if (!user) {
      throw ApiError.NotFound("Пользователь не найден");
    }

    if (user.avatarUrl) {
      const oldPath = path.join(
        process.cwd(),
        "static/avatars",
        path.basename(user.avatarUrl),
      );
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    user.avatarUrl = `avatars/${filename}`;
    await user.save();
    return user.avatarUrl;
  }

  async updateUser(
    userId: string,
    userData: { name: string; email: string; phone?: string },
  ): Promise<UserDto> {
    if (!userId) throw ApiError.Unauthorized();
    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.NotFound("Пользователь не найден");

    const candidate = await UserModel.findOne({ email: userData.email });
    if (candidate && candidate.id !== userId)
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${userData.email} уже существует`,
      );

    const phoneCandidate = await UserModel.findOne({ phone: userData.phone });
    if (phoneCandidate && phoneCandidate.id !== userId)
      throw ApiError.BadRequest(
        `Пользователь с номером телефона ${userData.phone} уже существует`,
      );

    user.email = userData.email;
    user.name = userData.name;
    user.phone = userData.phone;

    await user.save();

    const userDto = new UserDto(user);
    return userDto;
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    if (!userId) throw ApiError.Unauthorized();

    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.NotFound("Пользователь не найден");

    const isPassEquals = await bcrypt.compare(currentPassword, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Текущий пароль неверный");

    user.password = await bcrypt.hash(newPassword, 3);
    await user.save();
    return true;
  }

  async updateSettings(
    userId: string,
    settings: Partial<IUserSettings>,
  ): Promise<IUserSettings> {
    if (!userId) throw ApiError.Unauthorized();

    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.NotFound("Пользователь не найден");

    user.settings = { ...settings, ...user.settings };
    user.save();

    return user.settings;
  }

  async deleteUser(userId: string, refreshToken: string): Promise<boolean> {
    const user = await UserModel.findById(userId);
    if (!user) throw ApiError.NotFound("Пользователь не найден");

    await tokenService.removeToken(refreshToken);
    await UserModel.findByIdAndDelete(userId).exec();
    return true;
  }
}

const userService = new UserService();

export { userService };
