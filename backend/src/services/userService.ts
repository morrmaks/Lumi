import { mailService } from "@/services/mailService";
import { IUser, IUserSettings, UserModel } from "@/models/userModel";
import { ApiError } from "@/exeptions/apiError";
import bcrypt from "bcrypt";
import { UserDto } from "@/dtos/userDto";
import { tokenService } from "@/services/tokenService";
import path from "path";
import * as fs from "node:fs";
import { DeleteResult } from "mongodb";
import { OrderModel } from "@/models/orderModel";
import { bucketService } from "@/services/bucketService";

class UserService {
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    const user = await this._findUserByEmail(email);
    await this._checkPassword(password, user);

    return await this._generateAuthTokens(user);
  }

  async logout(refreshToken: string): Promise<DeleteResult> {
    return await tokenService.removeToken(refreshToken);
  }

  async registration(
    name: string,
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    if (!name || !email || !password)
      throw ApiError.BadRequest("Имя, email и пароль обязательны");
    await this._checkEmailNotExists(email);

    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    return await this._generateAuthTokens(user);
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this._findUserByEmail(email);

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
    if (!user)
      throw ApiError.BadRequest("Неверный код или срок действия истек");

    user.password = await bcrypt.hash(password, 3);
    user.resetPasswordCode = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return await this._generateAuthTokens(user);
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    if (!refreshToken) throw ApiError.Unauthorized();

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) throw ApiError.Unauthorized();

    const user = await this._findUserById(userData.id);
    return await this._generateAuthTokens(user);
  }

  async getMe(userId: string): Promise<UserDto> {
    const user = await this._findUserById(userId);
    return new UserDto(user);
  }

  async getOrdersCount(userId: string): Promise<number> {
    const user = await this._findUserById(userId);
    return await OrderModel.countDocuments({ userId: user._id }).exec();
  }

  async updateAvatar(
    userId: string,
    buffer: Buffer,
    contentType: string,
    filename: string,
  ): Promise<string> {
    const user = await this._findUserById(userId);
    if (user.avatarUrl) {
      const oldKey = new URL(user.avatarUrl).pathname.slice(1);
      await bucketService.deleteFile(oldKey);
    }

    const key = `avatars/${Date.now()}-${Math.round(Math.random() * 1e9)}-${filename}`;

    user.avatarUrl = await bucketService.uploadFile(buffer, key, contentType);
    await user.save();
    return user.avatarUrl;
  }

  async updateUser(
    userId: string,
    userData: { name: string; email: string; phone?: string },
  ): Promise<UserDto> {
    const user = await this._findUserById(userId);

    await this._checkEmailNotUsedByOthers(userData.email, userId);
    if (userData.phone)
      await this._checkPhoneNotUsedByOthers(userData.phone, userId);

    user.email = userData.email;
    user.name = userData.name;
    user.phone = userData.phone;
    await user.save();

    return new UserDto(user);
  }

  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ): Promise<boolean> {
    const user = await this._findUserById(userId);
    await this._checkPassword(currentPassword, user);

    user.password = await bcrypt.hash(newPassword, 3);
    await user.save();
    return true;
  }

  async updateSettings(
    userId: string,
    settings: Partial<IUserSettings>,
  ): Promise<IUserSettings> {
    const user = await this._findUserById(userId);
    user.settings = { ...settings, ...user.settings };
    await user.save();
    return user.settings;
  }

  async deleteUser(userId: string, refreshToken: string): Promise<boolean> {
    const user = await this._findUserById(userId);

    await tokenService.removeToken(refreshToken);
    await UserModel.findByIdAndDelete(userId).exec();
    return true;
  }

  private async _findUserByEmail(email: string): Promise<IUser> {
    if (!email) throw ApiError.BadRequest("Email и обязателен");

    const user = await UserModel.findOne<IUser>({ email });
    if (!user)
      throw ApiError.BadRequest("Пользователь с таким email не найден");

    return user;
  }

  private async _findUserById(userId: string): Promise<IUser> {
    if (!userId) throw ApiError.Unauthorized();

    const user = await UserModel.findById<IUser>(userId);
    if (!user) throw ApiError.NotFound("Пользователь не найден");
    return user;
  }

  private async _checkPassword(password: string, user: IUser) {
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) throw ApiError.BadRequest("Неверный пароль");
  }

  private async _checkEmailNotExists(email: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate)
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
  }

  private async _checkEmailNotUsedByOthers(email: string, userId: string) {
    const candidate = await UserModel.findOne({ email });
    if (candidate && candidate.id !== userId)
      throw ApiError.BadRequest(
        `Пользователь с почтовым адресом ${email} уже существует`,
      );
  }

  private async _checkPhoneNotUsedByOthers(phone: string, userId: string) {
    const candidate = await UserModel.findOne({ phone });
    if (candidate && candidate.id !== userId)
      throw ApiError.BadRequest(
        `Пользователь с номером телефона ${phone} уже существует`,
      );
  }

  private async _generateAuthTokens(
    user: IUser,
  ): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

const userService = new UserService();

export { userService };
