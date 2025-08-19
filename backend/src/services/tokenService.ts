import jwt, { JwtPayload } from "jsonwebtoken";
import { IUserDto } from "@/types/user";
import { env } from "@/config/env";
import { isTokenPayload } from "@/utils/token";
import { IToken, TokenModel } from "@/models/tokenModel";
import { DeleteResult } from "mongodb";

export interface TokenPayload extends JwtPayload, IUserDto {}

class TokenService {
  generateTokens(payload: IUserDto): {
    accessToken: string;
    refreshToken: string;
  } {
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: string): TokenPayload | null {
    try {
      const userData = jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
      if (isTokenPayload(userData)) return userData;
      return null;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: string): TokenPayload | null {
    try {
      const userData = jwt.verify(
        token,
        env.JWT_REFRESH_SECRET,
      ) as TokenPayload;
      if (isTokenPayload(userData)) return userData;
      return null;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: string, refreshToken: string): Promise<IToken> {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async findToken(refreshToken: string): Promise<IToken | null> {
    return await TokenModel.findOne({ refreshToken }).exec();
  }

  async removeToken(refreshToken: string): Promise<DeleteResult> {
    return await TokenModel.deleteOne({ refreshToken }).exec();
  }
}

const tokenService = new TokenService();

export { tokenService };
